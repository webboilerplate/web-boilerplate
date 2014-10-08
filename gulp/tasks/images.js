'use strict';

var gulp = require('gulp');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var handleErrors = require('../util/handleErrors');

var paths = require('../config').paths;


/*******************************************************************************
    IMAGES
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src([paths.src + '/' + paths.images + '/**/*', '!' + paths.src + '/' + paths.images + '/_**/*', '!' + paths.src + '/' + paths.images + '/_*'])
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.tmp + '/' + paths.images));

});
