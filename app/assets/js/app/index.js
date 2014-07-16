'use strict';


var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$ = require('jquery');

var AppRouter = require('./routes/app-router');


var App = function() {};

var _initialized = false;


App.prototype = {

  name: 'Web Boilerplate',

  model: {},
  view: {},
  controller: {},
  routes: {},

  root: '/',

  initialize: function() {

    if (!_initialized) {

      _initialized = true;

      this.routes.AppRouter = new AppRouter();

      Backbone.history.start({
        pushState: (window.history && window.history.pushState),
        root: this.root
      });

      //TODO initialize

    }
  },

  start: function() {
    if (!_initialized) {

      this.initialize();
    }
  },

  stop: function() {

  }
};

module.exports = new App();
