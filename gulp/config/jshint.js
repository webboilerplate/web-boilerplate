'use strict';

var config = require('./');

module.exports = {
  src: [
    config.path.src + '/' + config.path.js + '/**/*.js'
  ]
};
