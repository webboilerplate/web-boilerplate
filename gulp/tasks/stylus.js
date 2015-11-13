'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var reload = require('browser-sync').reload;
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browsers = require('../config/autoprefixer').browsers;
var handleErrors = require('../util/handleErrors');

var config = require('../config/stylus');

gulp.task('stylus', function() {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(stylus(config.settings))
    .on('error', handleErrors)
    .pipe(postcss([
      autoprefixer({
        browsers: browsers,
        cascade: false
      })
    ]))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({
      stream: true
    }));
});
