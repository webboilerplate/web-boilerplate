'use strict';


var gulp = require('gulp');
// var html        = require('../config/html');
// var iconFont    = require('../config/iconFont');
var sprites = require('../config/sprites');
var images = require('../config/images');
var sass = require('../config/sass');
var html = require('../config/html');
var stylus = require('../config/stylus');
var fonts = require('../config/fonts');
var browserSync = require('browser-sync');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/


gulp.task('watch', ['watchify', 'browserSync'], function() {

  var interval = process.env.WATCH_INTERVAL || 500;

  gulp.watch(sass.watch, ['sass']);

  gulp.watch(stylus.watch, ['stylus']);

  // gulp.watch(html.src, ['html']);

  gulp.watch(html.src, {
    interval: 1000
  }, [browserSync.reload]);

  gulp.watch(images.src, {
    interval: 2000
  }, ['images', browserSync.reload]);


  gulp.watch(sprites.src, {
    interval: 2000
  }, ['sprites', browserSync.reload]);

});
