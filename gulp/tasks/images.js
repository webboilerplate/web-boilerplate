'use strict';

var gulp = require('gulp');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var handleErrors = require('../util/handleErrors');

var folders = require('../config').folders;


/*******************************************************************************
    IMAGES
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src([folders.src + '/' + folders.assets.images + '/**/*', '!' + folders.src + '/' + folders.assets.images + '/_**/*', '!' + folders.src + '/' + folders.assets.images + '/_*'])
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .on('error', handleErrors)
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));

});
