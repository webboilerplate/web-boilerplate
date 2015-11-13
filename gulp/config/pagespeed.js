'use strict';
var gulp = require('gulp');


module.exports = [

  ///mobile
  {
    title: 'google mobile',
    site: 'http://google.com',
    settings: {
      // key: key
      nokey: 'true',
      strategy: 'mobile'
    }

  },

  ///desktop
  {
    title: 'google desktop',
    site: 'http://google.com',
    settings: {
      // key: key
      nokey: 'true',
      strategy: 'desktop'
    }
  }
];
