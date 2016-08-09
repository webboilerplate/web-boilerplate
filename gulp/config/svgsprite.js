'use strict';

var config = require('./');
var path = require('path');

var template = require('fs').readFileSync(path.resolve(__dirname , '../../lib/svgsprites.scss'), 'utf-8');


module.exports = {
  src: path.resolve(config.path.src, config.path.svg) + '/*.svg',
  dest: path.resolve(config.path.build, config.path.assets),
  watch: config.path.src + '/' + config.path.svg + '/**/*.svg',

  settings: {
    templates: {
        // scss:  true
        css:  template
    },
    common: 'icon',
    cssFile: 'sass/_svgsprite.scss',
    preview: false,
    svg: {
      sprite: 'images/svgsprite.svg'
    }
  }
};
