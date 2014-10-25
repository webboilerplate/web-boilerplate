'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var stylish = require('jshint-stylish');
var handleErrors = require('../util/handleErrors');

var config = require('../config');
var paths = config.paths;


/*******************************************************************************
    JAVASCRIPT TASK
*******************************************************************************/

gulp.task('js', function() {
  return gulp.src(paths.src + '/' + paths.js + '/' + config.js.main)
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: false,
      debug: true,
      // transform: ['jstify', 'debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
      shim: config.js.shim
    }))
    .on('error', handleErrors)
    .pipe(rename(config.js.out))
    .pipe(gulp.dest(paths.tmp + '/' + paths.js));
    /*.pipe(browserSync.reload({
      stream: true,
      once: true
    }));*/
});

gulp.task('jshint', function() {
  return gulp.src([paths.src + '/' + paths.js + '/**/*.js', '!' + paths.src + '/' + paths.js + '/vendor/**', '!' + paths.src + '/' + paths.js + '/app/libs/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});
