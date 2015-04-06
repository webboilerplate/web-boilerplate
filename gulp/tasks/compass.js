'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browsers = require('../config/autoprefixer').browsers;
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var handleErrors = require('../util/handleErrors');
var config = require('../config/compass');

gulp.task('compass', function() {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(compass(config.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: browsers,
      cascade: false
    }))
    .pipe(gulp.dest(config.dest));
});
