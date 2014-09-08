'use strict';

require('./app/util/error')();

var domReady = require('./lib/domready');
var fastdom = require('fastdom');
var FastClick = require('fastclick');
var polyfills = require('./polyfills');

//TODO implement
// var Ajaxify = require('./app/util/ajaxify/');
// new Ajaxify();

var app = require('./app');


console.log('Moin Moin and welcome to ' + app.name);

//TODO wech damit.
var page = document.body.getElementsByClassName('page')[0];
page.classList.add('page-current');


var onLoad = function() {

  app.start();

  var fastClick = new FastClick(document.body,{});

  fastdom.write(function() {
    document.body.classList.add('loaded');
  });

};


if (document.readyState === 'complete') {
  domReady(onLoad);
} else {
  window.onload = onLoad;
}
