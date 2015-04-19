'use strict';

var config = require('./');
var fontConfig = require('./fonts');

module.exports = {
  name: 'Gulp Starter Icons',
  watch: config.path.src + '/' + config.path.icons + '/*.svg',
  src: config.path.src + '/' + config.path.icons + '/*.svg',
  dest: fontConfig.build,
  sassDest: config.path.src + '/' + config.path.sass + '/generated',
  // template: './gulp/tasks/iconfont/template.sass',
  // sassOutputName: '_icons.sass',
  template: './gulp/tasks/iconfont/template.scss',
  sassOutputName: '_icons.scss',
  fontPath: '../../assets/fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    appendCodepoints: true,
    normalize: false
  }
};
