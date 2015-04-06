'use strict';

var gulp = require('gulp');
var csslint = require('gulp-csslint');
var config = require('../config');


/*******************************************************************************
    CSSLINT TASK
*******************************************************************************/

// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('csslint', function() {
  return gulp.src(config.path.build + '/' + config.path.css + '/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});
