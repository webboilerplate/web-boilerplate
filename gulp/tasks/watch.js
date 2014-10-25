'use strict';

var gulp = require('gulp');
var paths = require('../config').paths;
var reload = require('browser-sync').reload;
var browserSync = require('browser-sync');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/


gulp.task('watch', [ /*'setWatching', 'browserify'*/ ], function() {


  // Watch for changes in `src` folder
  gulp.watch(paths.src + '/**/*.{html,shtml,php,xml,json}', {
    interval: 500
  }, reload);

  // Watch .scss files
  gulp.watch(paths.src + '/' + paths.scss + '/**/*.scss', ['scss']);

  // Watch .stylus files
  gulp.watch(paths.src + '/' + paths.stylus + '/**/*.styl', ['stylus']);

  // Watch .js files
  gulp.watch([paths.src + '/' + paths.js + '/**/*.js'], ['js', reload]);

  // Watch .jade files
  gulp.watch(paths.src + '/' + paths.jade + '/**/*.jade', ['jade']);

  // Watch sprite changes
  gulp.watch(paths.src + '/' + paths.sprites + '/*.{png,jpg,gif}', {
    interval: 1000
  }, ['sprites', reload]);

  // Watch image files
  // gulp.watch(paths.src + '/assets/images/**/*', ['images']);
  //
});
