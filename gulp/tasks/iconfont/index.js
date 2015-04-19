'use strict';

var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var config           = require('../../config/iconfont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../util/handleErrors');

gulp.task('iconfont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('error', handleErrors)
    .on('codepoints', generateIconSass)
    .pipe(gulp.dest(config.dest));
});
