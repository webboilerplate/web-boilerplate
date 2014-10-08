'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var ignore = require('gulp-ignore');
var header = require('gulp-header');

var config = require('../config');
var paths = config.paths;

var pkg = require('../../package.json');


/*******************************************************************************
    Helper
*******************************************************************************/


var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''
].join('\n');


/*******************************************************************************
    BUILD / DIST TASK
*******************************************************************************/

gulp.task('js:dist', function() {
  return gulp.src(paths.tmp + '/' + paths.js + '/**/*.js')
    .pipe(uglify())
    .pipe(ignore.exclude(paths.tmp + '/' + paths.js + '/vendor/**'))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.dest + '/' + paths.js));
});


gulp.task('vendor:dist', function() {
  return gulp.src(paths.src + '/' + paths.js + '/vendor/*.js')
    .pipe(uglify())
    .pipe(ignore.include(paths.tmp + '/' + paths.js + '/vendor/*.htc'))
    .pipe(gulp.dest(paths.dest + '/' + paths.js + '/vendor'));
});


gulp.task('css:dist', function() {
  return gulp.src(paths.tmp + '/' + paths.css + '/**/*.css')
    .pipe(minifyCss({
      // noRebase: true,
      // noAdvanced: true,
      // keepSpecialComments: 0,
      // compatibility: 'ie8'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.dest + '/' + paths.css));
});

gulp.task('fonts:dist', function() {
  return gulp.src(paths.src + '/' + paths.fonts + '/**/*')
    .pipe(gulp.dest(paths.dest + '/assets/fonts'));
});

// copy all content from images/* excapt prefixed with _
gulp.task('images:dist', function() {
  return gulp.src([paths.src + '/' + paths.images + '/**/*', '!' + paths.src + '/' + paths.images + '/_**/*', '!' + paths.src + '/' + paths.images + '/_*', paths.tmp + '/' + paths.images + '/**/*', paths.tmp + '/' + paths.images + '/**/*'])
    .pipe(gulp.dest(paths.dest + '/' + paths.images));
});

gulp.task('html:tmp:dist', function() {
  return gulp.src(paths.tmp + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(paths.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src([paths.src + '/*.*', paths.src + '/.*', paths.src + '/**/*.{html,shtml,php,xml,json}', '!' + paths.components + '/**/*', '!' + paths.src + '/' + paths.js + '/**/*'])
    .pipe(gulp.dest(paths.dest));
});
