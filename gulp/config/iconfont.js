'use strict';

var config = require('./');
var fontConfig = require('./fonts');

var runTimestamp = Math.round(Date.now()/1000);

module.exports = {
  name: 'BGA Icons',
  // watch: config.path.build + '/' + config.path.icons + '/**/*.svg',
  src: config.path.src + '/' + config.path.svg + '/*.svg',
  // src: config.path.src + '/assets/sketch/icons-grid.sketch',
  // dest: fontConfig.build,
  sassDest: config.path.src + '/' + config.path.sass + '/generated',
  // template: './gulp/tasks/iconfont/template.sass',
  // sassOutputName: '_icons.sass',
  template: './gulp/tasks/iconfont/template.scss',
  sassOutputName: '_icons.scss',
  fontPath: config.path.build + '/assets/fonts',
  fontPathCss: '../../assets/fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    // appendUnicode: true, // recommended option
    formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
    timestamp: runTimestamp, // recommended to get consistent builds when watching files
    appendCodepoints: true
    // normalize: true,
    // fontHeight: 500
  }
};
