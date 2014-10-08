'use strict';

var gulp = require('gulp');
var folders = require('../config').folders;

var browserSync = require('browser-sync');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

  // Watch for changes in `src` folder
  gulp.watch(folders.src + '/**/*.{html,shtml,php,xml,json}', browserSync.reload);

  // Watch .scss files
  gulp.watch(folders.src + '/' + folders.assets.scss + '/**/*.scss', ['scss']);

  // Watch .stylus files
  gulp.watch(folders.src + '/' + folders.assets.stylus + '/**/*.styl', ['stylus']);

  // Watch .js files
  gulp.watch([folders.src + '/' + folders.assets.js + '/**/*.js'], ['js']);

  // Watch .jade files
  gulp.watch(folders.src + '/' + folders.jade + '/**/*.jade', ['jade']);

  // Watch sprite changes
  gulp.watch(folders.src + '/' + folders.assets.sprites + '/*.{png,jpg,gif}', ['sprites', browserSync.reload]);

  // Watch image files
  // gulp.watch(folders.src + '/assets/images/**/*', ['images']);
  //
  // Watch sprite changes
  gulp.watch(folders.src + '/' + folders.assets.sprites + '/*.png', ['sprites']);

});
