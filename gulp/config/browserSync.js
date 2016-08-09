'use strict';

var config = require('./');
var gutil = require('gulp-util');

module.exports = {

  notify: true,
  open: !(gutil.env.restart || false),
  ghostMode: !!(gutil.env.ghostMode || false),

  server: {
    baseDir: [config.path.build, config.path.static],
  },

  // proxy: {
  //   target: 'http://' + serverConfig.host + ':' + serverConfig.port,
  //   ws: true
  // },

  files: [
    config.path.build + '/**',
    '!' + config.path.build + '/**/*.map',
  ]
};
