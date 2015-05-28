'use strict';

var config = require('./');
var gutil = require('gulp-util');

module.exports = {

  notify: true,
  open: !(gutil.env.restart || false),
  ghostMode: !!(gutil.env.ghostMode || false),

  server: {
    baseDir: [config.path.build, config.path.src],
  },

  files: [
    config.path.build + '/**',
    '!' + config.path.build + '/**/*.map',
    '!' + config.path.build + '/**/*.{png,jpg,gif}',
  ]
};
