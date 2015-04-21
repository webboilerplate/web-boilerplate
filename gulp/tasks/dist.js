'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var tap = require('gulp-tap');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var pkg = require('../../package.json');
var config = require('../config');


/*******************************************************************************
    BUILD / DIST TASK
*******************************************************************************/

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''
].join('\n');



gulp.task('js:dist', function() {
  return gulp.src(config.path.build + '/' + config.path.js + '/**/*.js')
    .pipe(uglify())
    .pipe(ignore.exclude(config.path.build + '/' + config.path.js + '/vendor/**'))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(config.path.dest + '/' + config.path.js));
});


gulp.task('vendor:dist', function() {
  return gulp.src(config.path.src + '/' + config.path.js + '/vendor/*.{js,htc}')
    .pipe(uglify())
    .pipe(gulp.dest(config.path.dest + '/' + config.path.js + '/vendor'));
});



gulp.task('css:dist', function() {
  return gulp.src(config.path.build + '/' + config.path.css + '/**/*.css')
    .pipe(minifyCss({
      // rebase: false,
      // advanced: false,
      // keepSpecialComments: 0,
      // processImport:false,
      // compatibility: 'ie8'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(config.path.dest + '/' + config.path.css));
});


gulp.task('fonts:dist', function() {
  return gulp.src(config.path.src + '/' + config.path.fonts + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.fonts));
});

gulp.task('video:dist', function() {
  return gulp.src(config.path.src + '/' + config.path.video + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.video));
});

gulp.task('swf:dist', function() {
  return gulp.src(config.path.src + '/' + config.path.swf + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.swf));
});

gulp.task('images:dist', function() {
  return gulp.src(config.path.build + '/' + config.path.images + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.images));
});

gulp.task('html:build:dist', function() {
  return gulp.src(config.path.build + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(config.path.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src(
      [
        config.path.src + '/*.*',
        config.path.src + '/.*',
        config.path.src + '/**/*.{html,shtml,php,xml,json}',
        '!' + config.path.src + '/data/**/*',
        '!' + config.path.src + '/' + config.path.js + '/**/*'
      ])
    .pipe(gulp.dest(config.path.dest));
});


gulp.task('server:dist', function() {
  return gulp.src('./server/**/**')
    .pipe(gulp.dest(config.path.dest + '/server'));
});


gulp.task('pkg:dist', function() {
  return gulp.src('./package.json')
    .pipe(tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
      delete(pkg.devDependencies);
      delete(pkg.scripts);
      pkg.scripts = {
        'start': 'npm install && node ./server/index.js'
      };
      file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    }))
    .pipe(gulp.dest(config.path.dest));
});
