module.exports = function() {

  'use strict';

  window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    document.body.classList.add('loaded');
    console.log('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj);
    document.body.style.background = '#990000';
  };
};
