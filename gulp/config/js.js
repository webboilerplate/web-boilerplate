'use strict';

var config = require('./');
var path = require('path');

module.exports = {
  src: path.resolve(config.path.src, config.path.js) + '/main.js',
  dest: path.resolve(config.path.build, config.path.js),
  watch: config.path.src + '/' + config.path.js + '/**/*.{js}',

  extractSharedJs: true

};
