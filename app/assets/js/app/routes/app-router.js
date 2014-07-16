'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$ = require('jquery');

var delegate = require('delegatejs');
var fastdom = require('fastdom');

var animEndEventNames = {
  'WebkitAnimation': 'webkitAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd',
  'animation': 'animationend'
};

var outClass = 'gpu pt-page-moveToLeftEasing';
var inClass = 'gpu pt-page-moveFromRight';

// var outClass = 'gpu pt-page-flipOutLeft';
// var inClass = 'gpu pt-page-flipInRight pt-page-delay500';


//gpu pt-page-flipInRight pt-page-ontop

var animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ];



//var cssTweenEvent = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';


var AppRouter = module.exports = Backbone.Router.extend({

  $currentPage: null,
  currentPathname: '',
  currentRoute: 'index',

  routes: {
    '': 'index',
    'about.html': 'about',
    'about': 'about'
  },


  initialize: function() {

    var ctx = this;

    this.on('route', this.onRoute.bind(this));

    $(document).on('click', 'a[href^="/"]', function(event) {

      var $target = $(event.currentTarget);
      var passThrough = $target.attr('data-external-link');

      if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        var href = $target.attr('href');
        var url = href.replace(/^\//, '').replace('\#\!\/', '');

        ctx.navigate(url, {
          trigger: true,
          replace: false
        });

        return false;
      }

    });

  },


  loadPage: function(url) {

    var ctx = this;


    $.ajax({
      url: url,
      processData: false,
      dataType: 'html',
      // context: document.body,
      success: function(data) {

        fastdom.read(function() {
          var $content = $('<html>').append($.parseHTML(data));

          var $lastPage = ctx.$currentPage ||  $('.page').first();
          var $nextPage = $content.find('.page').first();

          $lastPage.on(animEndEventName, function(event) {
            $lastPage.off().remove();
            $lastPage = null;
            $('head').find('title').text($content.find('title').text());
          });

          fastdom.write(function() {
            $lastPage.removeClass(inClass)
              .addClass(outClass);

            $nextPage.addClass(inClass);
            $('body').append($nextPage);
          });
        });
      }
    });
  },

  getUrlSegments: function() {
    var pathname = window.location.pathname;
    if (pathname.charAt(0) === '/') {
      pathname = pathname.substring(1, (pathname.charAt(pathname.length - 1) === '/') ? pathname.length - 1 : pathname.length);
    }
    if (pathname !== '' && pathname !== '/') {
      return pathname.split('/');
    }
    return [''];
  },

  onRoute: function(name) {
    this.currentRoute = name;
  },



  index: function() {
    console.log('index');
    if (this.currentRoute !== 'index') {
      console.log('load index');
      this.loadPage('/index.html');
    }
  },

  about: function() {
    console.log('about');
    if (this.currentRoute !== 'about') {
      this.loadPage('/about.html');
      console.log('load about');

    }
  }

});
