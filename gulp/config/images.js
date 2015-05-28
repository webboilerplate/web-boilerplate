'use strict';

var config = require('./');

module.exports = {
  watch: config.path.src + '/' + config.path.images + '/**/*',
  src: config.path.src + '/' + config.path.images + '/**/*',
  dest: config.path.build + '/' + config.path.images,

  imagemin: {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }
};
