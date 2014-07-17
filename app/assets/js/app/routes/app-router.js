'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$ = require('jquery');

var fastdom = require('fastdom');

var Cache = require('../util/simple-cache');


var animEndEventNames = {
  'WebkitAnimation': 'webkitAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd',
  'animation': 'animationend'
};

var outClass = 'layer page-scaleDown';
var inClass = 'layer page-moveFromRight page-ontop';

//var cssTweenEvent = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
var animEndEventName = animEndEventNames[window.Modernizr.prefixed('animation')];

var cache = new Cache();

var AppRouter = module.exports = Backbone.Router.extend({

  currentPage: null,

  currentRoute: 'index',

  routes: {
    'index.html': 'index',
    '': 'index',
    'about.html': 'about',
    'about': 'about'
  },


  initialize: function() {

    console.log(window.location.pathname);

    var ctx = this;

    this.on('route', this.onRoute.bind(this));

    $(document).on('click', 'a[href^="/"]', this.onRequestNavigation.bind(this));

  },

  onRoute: function(name) {
    this.currentRoute = name;
  },

  onRequestNavigation: function(event) {

    var $target = $(event.currentTarget);
    var passThrough = $target.attr('data-external-link');

    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      var href = $target.attr('href');
      var url = href.replace(/^\//, '').replace('\#\!\/', '');

      this.navigate(url, {
        trigger: true,
        replace: false
      });

      return false;
    }

  },

  showPage: function(url) {

    if (!cache.has(url)) {
      this.loadPage(url);
    } else {

      if (this.currentPage === cache.get(url).page) {
        return;
      }

      var ctx = this;

      var lastPage = ctx.currentPage ||  $('.page').first();
      var title = cache.get(url).title;
      ctx.currentPage = cache.get(url).page;

      if (ctx.currentPage.parent().length === 0) {
        ctx.currentPage.appendTo(document.body);
      }

      fastdom.write(function() {

        lastPage.on(animEndEventName, function(event) {
            $('head').find('title').text(title);
            $(this).off(animEndEventName).removeClass(outClass + ' page-current');
            // $(this).off(animEndEventName).removeClass(outClass + ' page-current').remove();
          })
          .addClass(outClass);

        ctx.currentPage.removeClass(outClass).addClass(inClass + ' page-current')
          .on(animEndEventName, function(event) {
            $(this).off(animEndEventName).removeClass(inClass);
          });

      });


    }
  },


  loadPage: function(url) {

    var ctx = this;

    $.ajax({
        url: url,
        processData: false,
        dataType: 'html',
        context: document.body,
      })
      .done(function(data) {
        var $content = $('<html>').append($.parseHTML(data));
        var page = $content.find('.page').first().clone();

        var nextPage = {
          page: page,
          title: $content.find('title').text()
        };

        cache.set(url, nextPage);
        ctx.showPage(url);

        $content = null;

      })
      .error(function(e) {
        console.error(e);
      });
  },


  index: function() {
    if (this.currentRoute !== 'index') {
      this.showPage('/index.html');
    }
  },

  about: function() {
    if (this.currentRoute !== 'about') {
      this.showPage('/about.html');
    }
  }

});
