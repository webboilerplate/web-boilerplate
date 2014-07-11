'use strict';

var domReady = require('domready');
var fastdom = require('fastdom');
var FastClick = require('fastclick');

var app = require('./app/core');

window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    document.body.classList.add('loaded');
    console.log('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj);
    document.body.style.background = '#990000';
};

console.log('Moin Moin and welcome to ' + app.name);

var onLoad = function() {
    app.start();
    var fc = new FastClick(document.body, {});
    fastdom.write(function() {
        document.body.classList.add('loaded');
    });
};


if (document.readyState === 'complete') {
    domReady(onLoad);
} else {
    window.onload = onLoad;
}
