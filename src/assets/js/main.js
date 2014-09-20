'use strict';

var domReady = require('./lib/domready');
var fastdom = require('fastdom');
var FastClick = require('fastclick');
var polyfills = require('./polyfills');

var loadTimeout = 0;

var App = require('./app');
var app = new App();

console.log('Moin Moin and welcome to ' + app.name);

var onLoad = function() {

  if (loadTimeout) {
    clearTimeout(loadTimeout);
  }

  app.start();

  var fastClick = new FastClick(document.body, {});

  fastdom.write(function() {
    document.body.classList.add('loaded');
  });

};

if (document.readyState === 'complete') {
  domReady(onLoad);
} else {
  loadTimeout = setTimeout(onLoad, 2600);
  window.onload = onLoad;
}
