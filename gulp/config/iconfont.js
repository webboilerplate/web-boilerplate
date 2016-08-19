'use strict';

var config = require('./');
var fontConfig = require('./fonts');

var runTimestamp = Math.round(Date.now()/1000);

module.exports = {

  src: config.path.src + '/' + config.path.iconfont + '/*.svg',
  dest: fontConfig.build,
  fontName: 'icons',
  template: 'lib/_iconfont.scss',
  targetPath: '../sass/_iconfont.scss',
  fontPath: '../fonts/',
  formats: ['ttf', 'eot', 'woff','woff2', 'svg']
};
