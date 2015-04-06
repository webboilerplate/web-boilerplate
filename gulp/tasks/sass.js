'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browsers = require('../config/autoprefixer').browsers;
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var base64 = require('gulp-base64');
var config = require('../config/sass');

// var bless = require('gulp-bless');
// var changed = require('gulp-changed');


/*******************************************************************************
    SCSS TASK
*******************************************************************************/


var stats = {};
gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    // .pipe(changed(config.dest, {
    //   extension: '.css'
    // }))
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: browsers,
      cascade: false
    }))
    .pipe(base64(config.base64))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});




// Split CSS for IE
// gulp.task('splitCSS', function() {
//   return gulp.src(paths.tmp + '/' + paths.css + '/main-ie.css')
//     .pipe(bless())
//     .pipe(gulp.dest(paths.tmp + '/' + paths.css));
// });
