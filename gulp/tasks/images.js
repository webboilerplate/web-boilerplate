'use strict';

var gulp = require('gulp');
// var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

var handleErrors = require('../util/handleErrors');
var config = require('../config/images');

//
// IMAGES
//

// gulp.task('cache-clear', function(done) {
//   return cache.clearAll(done);
// });

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(imagemin(config.imagemin))
    // .pipe(cache(imagemin(config.imagemin), {
    //   fileCache: new cache.Cache({
    //     tmpDir: '.gulp-cache'
    //   })
    // }))
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors);
});
