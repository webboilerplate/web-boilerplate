'use strict';

var App = function() {};



App.prototype = {

  name: 'Web Boilerplate',

  _initialized: false,

  model: {},
  view: {},
  controller: {},
  routes: {},

  root: '/',

  initialize: function() {

    if (!this._initialized) {
      this._initialized = true;

      //TODO initialize
    }
  },

  start: function() {
    if (!this._initialized) {
      this.initialize();
    }
  },

  stop: function() {

  }
};

module.exports = App;
