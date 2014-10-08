'use strict';

var gulp = require('gulp');
var csslint = require('gulp-csslint');
var stylestats = require('gulp-stylestats');
var folders = require('../config').folders;


/*******************************************************************************
    CSS TASK
*******************************************************************************/

// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('csslint', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});



gulp.task('stylestats', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/main.css')
    .pipe(stylestats());
});
