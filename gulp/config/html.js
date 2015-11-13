'use strict';

var config = require('./');
var path = require('path');

//
//
//

module.exports = {
  watch: config.path.src + '/**/*.html',
  src: config.path.src + '/**/*.html',
  dest: config.path.build
};
