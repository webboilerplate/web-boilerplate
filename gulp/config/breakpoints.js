'use strict';

var config = require('./');

module.exports = {
  src: config.path.src + '/' + config.path.js + '/app/config/breakpoints.json',
  watch: config.path.src + '/' + config.path.js + '/app/config/breakpoints.json',
  cssName: '_breakpoints.scss',
  dest: config.path.build + '/' + config.path.sass + '/'
};
