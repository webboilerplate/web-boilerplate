'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');
var config = require('../config/scsslint');
var scsslint = require('gulp-scss-lint');

gulp.task('scsslint', function() {
  return gulp.src(config.src)
    .pipe(cache('scsslint'))
    .pipe(scsslint({
      maxBuffer: 1000 * 1024,
      config: '.scss-lint.yml'
    }));
  // .pipe(gulp.dest('./reports'));
});
