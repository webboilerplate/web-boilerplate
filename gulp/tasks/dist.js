'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var ignore = require('gulp-ignore');
var header = require('gulp-header');

var config = require('../config');
var folders = config.folders;

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
  return gulp.src(folders.tmp + '/' + folders.assets.js + '/**/*.js')
    .pipe(uglify())
    .pipe(ignore.exclude(folders.tmp + '/' + folders.assets.js + '/vendor/**'))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.js));
});


gulp.task('vendor:dist', function() {
  return gulp.src(folders.src + '/' + folders.assets.js + '/vendor/*.js')
    .pipe(uglify())
    .pipe(ignore.include(folders.tmp + '/' + folders.assets.js + '/vendor/*.htc'))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.js + '/vendor'));
});


gulp.task('css:dist', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/**/*.css')
    .pipe(minifyCss({
      // noRebase: true,
      // noAdvanced: true,
      // keepSpecialComments: 0,
      // compatibility: 'ie8'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.css));
});

gulp.task('fonts:dist', function() {
  return gulp.src(folders.src + '/' + folders.assets.fonts + '/**/*')
    .pipe(gulp.dest(folders.dest + '/assets/fonts'));
});

// copy all content from images/* excapt prefixed with _
gulp.task('images:dist', function() {
  return gulp.src([folders.src + '/' + folders.assets.images + '/**/*', '!' + folders.src + '/' + folders.assets.images + '/_**/*', '!' + folders.src + '/' + folders.assets.images + '/_*', folders.tmp + '/' + folders.assets.images + '/**/*', folders.tmp + '/' + folders.assets.images + '/**/*'])
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.images));
});

gulp.task('html:tmp:dist', function() {
  return gulp.src(folders.tmp + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(folders.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src([folders.src + '/*.*', folders.src + '/.*', folders.src + '/**/*.{html,shtml,php,xml,json}', '!' + folders.components + '/**/*', '!' + folders.src + '/' + folders.assets.js + '/**/*'])
    .pipe(gulp.dest(folders.dest));
});

