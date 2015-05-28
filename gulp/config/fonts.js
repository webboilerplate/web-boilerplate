'use strict';

var config = require('./');
var path = require('path');

module.exports = {
  src: [
    path.resolve(config.path.src, config.path.fonts) + '/**/*',
    path.resolve(config.path.build, config.path.fonts) + '/**/*'
  ],
  dest: path.resolve(config.path.dest, config.path.fonts),
  build: path.resolve(config.path.build, config.path.fonts)
};
