'use strict';


var gulp = require('gulp');
// var html        = require('../config/html');
// var iconFont    = require('../config/iconFont');
var sprites = require('../config/sprites');
var images = require('../config/images');
var sass = require('../config/sass');
var stylus = require('../config/stylus');
var fonts = require('../config/fonts');
var browserSync = require('browser-sync');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/


gulp.task('watch', ['browserSync'], function() {

  var interval = process.env.WATCH_INTERVAL || 500;

  gulp.watch(sass.src, ['sass']);

  gulp.watch(stylus.src, ['stylus']);


  gulp.watch(images.src, {
    interval: 2000
  }, ['images', browserSync.reload]);


  gulp.watch(sprites.src, {
    interval: 2000
  }, ['sprites', browserSync.reload]);

});
