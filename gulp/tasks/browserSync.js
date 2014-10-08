'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');

var paths = require('../config').paths;


gulp.task('browserSync:dev', function() {
  var openBrowserWindow = !(gutil.env.restart || false);
  var ghostMode = !!(gutil.env.ghostMode || false);

  browserSync({
    notify: false,
    open: true,
    ghostMode: ghostMode,

    server: {
      baseDir: [paths.tmp, paths.src]
    }
  });
});


// Build and serve the output from the dist build
gulp.task('browserSync:dist', ['dist'], function() {
  var openBrowserWindow = !(gutil.env.restart || false);

  browserSync({
    notify: false,
    open: openBrowserWindow,
    ghostMode: false,
    server: {
      baseDir: paths.dest
    }
  });
});
