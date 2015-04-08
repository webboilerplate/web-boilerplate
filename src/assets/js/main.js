'use strict';

let App = require('./app');

let domready = require('domready');
let fastdom = require('fastdom');
let fastclick = require('fastclick');

class Main {

  constructor() {

    this.loadTimeout = 0;
    this.app = new App();

    let onLoad = this.onLoad.bind(this);

    if (document.readyState === 'complete') {
      domready(onLoad);
    } else {
      this.loadTimeout = setTimeout(onLoad, 2600);
      window.onload = onLoad;
    }
  }


  onLoad() {

    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }

    this.app.start();

    fastclick(document.body);

    fastdom.write(function() {
      document.documentElement.classList.add('loaded');
    });
  }
}


module.exports = new Main();
