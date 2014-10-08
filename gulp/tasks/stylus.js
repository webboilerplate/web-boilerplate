'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

var browserSync = require('browser-sync');

var config = require('../config');
var folders = config.folders;

gulp.task('stylus', function() {
  return gulp.src(folders.src + '/' + folders.assets.stylus + '/' + config.styles.stylus.main)
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
        paths: [__dirname + '/' + folders.src + '/' + folders.assets.images],
        limit: false
      },
      error: true
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

