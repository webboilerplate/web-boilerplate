'use strict';

var gulp = require('gulp');
var paths = require('../config').paths;

var browserSync = require('browser-sync');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

  // Watch for changes in `src` folder
  gulp.watch(paths.src + '/**/*.{html,shtml,php,xml,json}', browserSync.reload);

  // Watch .scss files
  gulp.watch(paths.src + '/' + paths.scss + '/**/*.scss', ['scss']);

  // Watch .stylus files
  gulp.watch(paths.src + '/' + paths.stylus + '/**/*.styl', ['stylus']);

  // Watch .js files
  gulp.watch([paths.src + '/' + paths.js + '/**/*.js'], ['js']);

  // Watch .jade files
  gulp.watch(paths.src + '/' + paths.jade + '/**/*.jade', ['jade']);

  // Watch sprite changes
  gulp.watch(paths.src + '/' + paths.sprites + '/*.{png,jpg,gif}', ['sprites', browserSync.reload]);

  // Watch image files
  // gulp.watch(paths.src + '/assets/images/**/*', ['images']);
  //
  // Watch sprite changes
  gulp.watch(paths.src + '/' + paths.sprites + '/*.png', ['sprites']);

});
