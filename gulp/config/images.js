'use strict';

var config = require('./');

module.exports = {
  watch: config.path.static + '/' + config.path.images + '/**/*',
  src: [
    config.path.static + '/' + config.path.images + '/**/*',
    config.path.build + '/' + config.path.images + '/**/*'
  ],
  dest: config.path.build + '/' + config.path.images,

  imagemin: {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }
};
