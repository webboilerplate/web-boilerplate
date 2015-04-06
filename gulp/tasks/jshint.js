'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var config = require('../config/jshint');


/*******************************************************************************
    JAVASCRIPT TASK
*******************************************************************************/

gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});
