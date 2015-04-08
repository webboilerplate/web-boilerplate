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
var reload = browserSync.reload;

/*******************************************************************************
    WATCH TASK
*******************************************************************************/


gulp.task('watch', ['watchify', 'browserSync'], function() {

  // var interval = gulp.env.interval || 500;

  gulp.watch(sass.watch, ['sass']);
  gulp.watch(stylus.watch, ['stylus']);
  gulp.watch(html.watch, { interval: 1000 }).on('change', reload);
  gulp.watch(images.watch, { interval: 2000 }).on('change', reload);
  gulp.watch(sprites.watch, { interval: 2000 }).on('change', reload);

});
