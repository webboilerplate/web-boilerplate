'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var stylish = require('jshint-stylish');
var handleErrors = require('../util/handleErrors');

var browserSync = require('browser-sync');

var config = require('../config');
var folders = config.folders;
/*******************************************************************************
    JAVASCRIPT TASK
*******************************************************************************/

gulp.task('jshint', function() {
  return gulp.src([folders.src + '/' + folders.assets.js + '/**/*.js', '!' + folders.src + '/' + folders.assets.js + '/vendor/**', '!' + folders.src + '/' + folders.assets.js + '/app/libs/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});


gulp.task('js', function() {
  return gulp.src(folders.src + '/' + folders.assets.js + '/' + config.js.main)
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: false,
      debug: true,
      // transform: ['jstify', 'debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
      shim: config.js.shim
    }))
    .on('error', handleErrors)
    .pipe(rename(config.js.out))
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.js))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});
