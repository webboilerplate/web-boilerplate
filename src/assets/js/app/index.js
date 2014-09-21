'use strict';

//basic polyfills needed in almost every project
//var polyfills = require('./polyfills');

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

      console.log('Moin Moin and welcome to ' + this.name);

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
