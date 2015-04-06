'use strict';

var gulp = require('gulp');
var stylestats = require('gulp-stylestats');

var config = require('../config');



/*******************************************************************************
    STYLESTATS TASK
*******************************************************************************/


gulp.task('stylestats', function() {
  return gulp.src(config.path.build + '/' + config.path.css + '/**/*.css')
    .pipe(stylestats());
});
