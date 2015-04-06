'use strict';

var gulp = require('gulp');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var handleErrors = require('../util/handleErrors');

var config = require('../config/images');


/*******************************************************************************
    IMAGES
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(cache(imagemin(config.imagemin)))
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors);
});
