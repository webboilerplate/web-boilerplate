'use strict';

//basic polyfills needed in almost every project
var polyfills = require('./polyfills');

var device = require('device.js')();
device.addClasses();

class App {

  constructor() {
    this.name = 'Web Boilerplate';
    this._initialized = false;
  }


  initialize() {
    this._initialized = true;
    //TODO initialize
  }

  start() {
    if (!this._initialized) {
      this.initialize();

      console.log(`
      Moin Moin
    and welcome to
   ` + this.name);
    }
  }


  pause() {}

  stop() {}

}


module.exports = App;
