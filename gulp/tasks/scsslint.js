'use strict';

var gulp = require('gulp');
// var cache = require('gulp-cached');
var config = require('../config/scsslint');
var sassLint = require('gulp-sass-lint');

//
//
//

gulp.task('scsslint', function() {
  return gulp.src(config.src)
    .pipe(sassLint({
      configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
