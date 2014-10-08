'use strict';

var gulp = require('gulp');
var csslint = require('gulp-csslint');
var stylestats = require('gulp-stylestats');
var paths = require('../config').paths;


/*******************************************************************************
    CSS TASK
*******************************************************************************/

// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('csslint', function() {
  return gulp.src(paths.tmp + '/' + paths.css + '/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});



gulp.task('stylestats', function() {
  return gulp.src(paths.tmp + '/' + paths.css + '/main.css')
    .pipe(stylestats());
});
