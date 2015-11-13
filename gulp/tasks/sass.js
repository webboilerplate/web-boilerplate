'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var base64 = require('gulp-base64');

// postcss plugins
// var lost = require('lost');
var autoprefixer = require('autoprefixer');

var handleErrors = require('../util/handleErrors');
var config = require('../config/sass');
var browsers = require('../config/autoprefixer').browsers;

// postcss plugin for cross browser inline-block
// http://blog.mozilla.org/webdev/2009/02/20/cross-browser-inline-block/
var inlineblock = function(opts) {
  return function(css, result) {
    css.eachDecl(function(decl) {
      if (decl.prop === 'display' && decl.value === 'inline-block') {
        decl.parent.insertBefore(decl, {prop: 'display', value: '-moz-inline-stack'});
        decl.parent.insertBefore(decl, {prop: '-moz-box-orient', value: 'vertical'});
        decl.parent.insertAfter(decl, {prop: '*display', value: 'inline'});
        decl.parent.insertAfter(decl, {prop: 'vertical-align', value: 'top'});
        decl.parent.insertAfter(decl, {prop: 'zoom*', value: 1});
      }
    });
  };
};

//
// SCSS TASK
//
//

gulp.task('sass', function() {

  // var production = !!gutil.env.production;

  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    // .pipe(base64(config.base64))
    .pipe(postcss([
      autoprefixer({
        browsers: browsers,
        cascade: false
      }),
      inlineblock()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});

// Split CSS for IE
// gulp.task('splitCSS', function() {
//   return gulp.src(paths.tmp + '/' + paths.css + '/main-ie.css')
//     .pipe(bless())
//     .pipe(gulp.dest(paths.tmp + '/' + paths.css));
// });
