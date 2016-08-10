'use strict';

var gulp = require('gulp');
var config = require('../config');
var gutil = require('gulp-util');

var preprocessor = process.env.PREPROCESSOR || config.preprocessor;

gulp.task('styles', [preprocessor]);
