'use strict';

var domReady = require('./lib/domready');
var fastdom = require('fastdom');
var FastClick = require('fastclick');
var polyfills = require('./polyfills');

var app = require('./app');
console.log('Moin Moin and welcome to ' + app.name);


var startTimeOut = 0;

var onLoad = function() {

  if (startTimeOut) {
    clearTimeout(startTimeOut);
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
  startTimeOut = setTimeout(onLoad, 2600);
  window.onload = onLoad;
}
