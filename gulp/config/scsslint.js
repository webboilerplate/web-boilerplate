'use strict';

var config = require('./');

module.exports = {
  src: [
    config.path.src + '/' + config.path.sass + '/**/*.scss',
    '!' + config.path.src + '/' + config.path.sass + '/vendor/**',
    '!' + config.path.src + '/' + config.path.sass + '/app/utils/**',
    '!' + config.path.src + '/' + config.path.sass + '/app/plugins/**'
  ]
};
