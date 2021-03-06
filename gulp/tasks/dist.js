'use strict';

var gulp = require('gulp');
var tap = require('gulp-tap');
var cleanCSS = require('gulp-clean-css');
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

gulp.task('static:dist', function() {
  return gulp.src(config.path.static +'/**' )
    .pipe(gulp.dest(config.path.dest + '/' + config.path.public));
});


gulp.task('server:dist', function() {
  return gulp.src('server/**')
    .pipe(gulp.dest(config.path.dest + '/server'));
});

gulp.task('css:dist', function() {
  return gulp.src([
    config.path.build + '/' + config.path.css + '/**/*.css',
    ])
    .pipe(cleanCSS({
      keepSpecialComments: 0,
      rebase: false
    }))
    // .pipe(header(banner, {
    //   pkg: pkg
    // }))
    .pipe(gulp.dest(config.path.dest + '/' + config.path.public + '/' + config.path.css));
});

gulp.task('images:dist', function() {
  return gulp.src(config.path.build + '/' + config.path.images + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.public + '/' + config.path.images));
});


gulp.task('fonts:dist', function() {
  return gulp.src(config.path.build + '/' + config.path.fonts + '/**/*')
    .pipe(gulp.dest(config.path.dest + '/' + config.path.public + '/' + config.path.fonts));
});


gulp.task('pkg:dist', function() {
  return gulp.src('./package.json')
    .pipe(tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
      delete(pkg.devDependencies);
      delete(pkg.scripts);
      delete(pkg.repository);
      delete(pkg.browser);
      delete(pkg.browserify);
      delete(pkg['browserify-shim']);
      pkg.scripts = {
        start: 'NODE_ENV=production npm install && node ./server',
      };
      file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    }))
    .pipe(gulp.dest(config.path.dest));
});
