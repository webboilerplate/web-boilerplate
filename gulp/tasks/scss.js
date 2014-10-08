'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

var scsslint = require('gulp-scss-lint');

var browserSync = require('browser-sync');

var config = require('../config');
var paths = config.paths;

var stats = {};
gulp.task('scss', function() {
  return gulp.src(paths.src + '/' + paths.scss + '/' + config.styles.scss.main)
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [paths.components],
      outputStyle: 'nested',
      stats: stats
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      browsers: config.autoprefixer.def,
      cascade: false
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.tmp + '/' + paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('scsslint', function() {
  gulp.src([paths.src + '/' + paths.scss + '/**/*.scss', '!' + paths.src + '/' + paths.scss + '/vendor/**'])
    .pipe(scsslint({
      'config': paths.src + '/' + paths.scss + '/.scss-lint.yml',
    }));
});
