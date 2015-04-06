'use strict';

var domready = require('domready');
var fastdom = require('fastdom');
var FastClick = require('fastclick');

var loadTimeout = 0;

var App = require('./app');

var onLoad = function() {

  if (loadTimeout) {
    clearTimeout(loadTimeout);
  }

  var app = new App();
  app.start();

  new FastClick(document.body, {});

  fastdom.write(function() {
    document.body.classList.add('loaded');
  });

};

if (document.readyState === 'complete') {
  domready(onLoad);
} else {
  loadTimeout = setTimeout(onLoad, 2600);
  window.onload = onLoad;
}
