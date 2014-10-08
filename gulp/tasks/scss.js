'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

var scsslint = require('gulp-scss-lint');

var browserSync = require('browser-sync');

var config = require('../config');
var folders = config.folders;

var stats = {};
gulp.task('scss', function() {
  return gulp.src(folders.src + '/' + folders.assets.scss + '/' + config.styles.scss.main)
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [folders.components],
      outputStyle: 'nested',
      stats: stats
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: config.autoprefixer.def,
      cascade: false
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('scsslint', function() {
  gulp.src([folders.src + '/' + folders.assets.scss + '/**/*.scss', '!' + folders.src + '/' + folders.assets.scss + '/vendor/**'])
    .pipe(scsslint({
      'config': folders.src + '/' + folders.assets.scss + '/.scss-lint.yml',
    }));
});
