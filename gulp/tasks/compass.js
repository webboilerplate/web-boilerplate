'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var handleErrors = require('../util/handleErrors');

var browserSync = require('browser-sync');

var config = require('../config');
var folders = config.folders;

gulp.task('compass', function() {
  return gulp.src(folders.src + '/' + folders.assets.scss + '/' + config.styles.scss.main)
    .pipe(plumber())
    .pipe(compass({
      css: folders.tmp + '/' + folders.assets.css,
      sass: folders.src + '/' + folders.assets.scss,
      image: folders.src + '/' + folders.assets.images,
      javascripts: folders.src + '/' + folders.assets.js,
      fonts: folders.src + '/' + folders.assets.fonts,
      import_path: folders.components
        //, require: ['susy', 'modular-scale']
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
