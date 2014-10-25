'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var reload = require('browser-sync').reload;
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

var config = require('../config');
var paths = config.paths;

gulp.task('stylus', function() {
  return gulp.src(paths.src + '/' + paths.stylus + '/' + config.stylus.main)
    .pipe(plumber())
    .pipe(stylus({
      //use: nib(),
      linenos: true,
      sourcemap: {
        inline: true,
        sourceRoot: '..',
        basePath: 'css'
      },
      url: {
        name: 'embedurl',
        paths: [__dirname + '/' + paths.src + '/' + paths.images],
        limit: false
      },
      error: true
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(paths.tmp + '/' + paths.css))
    .pipe(reload({
      stream: true
    }));
});
