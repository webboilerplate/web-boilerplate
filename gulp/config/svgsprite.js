'use strict';

var config = require('./');
var path = require('path');

module.exports = {
  src: path.resolve(config.path.src, config.path.svg) + '/*.svg',
  dest: path.resolve(config.path.build),
  watch: config.path.src + '/' + config.path.svg + '/**/*.svg',

  settings: {
    // mode: 'symbols',
    // selector: 'svg-%f',
    common: 'svg-icon',
    cssFile: 'sass/_svgsprite.scss',
    preview: false,
    svg: {
      sprite: 'images/svgsprite.svg'
    }
  }
};
