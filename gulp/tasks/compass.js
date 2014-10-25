'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var handleErrors = require('../util/handleErrors');

var config = require('../config');
var paths = config.paths;

gulp.task('compass', function() {
  return gulp.src(paths.src + '/' + paths.scss + '/' + config.scss.main)
    .pipe(plumber())
    .pipe(compass({
      css: paths.tmp + '/' + paths.css,
      sass: paths.src + '/' + paths.scss,
      image: paths.src + '/' + paths.images,
      javascripts: paths.src + '/' + paths.js,
      fonts: paths.src + '/' + paths.fonts,
      import_path: paths.components
        //, require: ['susy', 'modular-scale']
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(paths.tmp + '/css'));
});
