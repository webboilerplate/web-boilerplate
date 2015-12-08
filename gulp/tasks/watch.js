'use strict';


var gulp = require('gulp');
var iconfont    = require('../config/iconfont');
var sprites = require('../config/sprites');
var images = require('../config/images');
var sass = require('../config/sass');
var html = require('../config/html');
var stylus = require('../config/stylus');
var fonts = require('../config/fonts');
var browserSync = require('browser-sync');
var sketch = require('../config/sketch');
var breakpoints = require('../config/breakpoints');
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
  gulp.watch(sprites.watch, {interval: 2000}, ['sprites']);
  gulp.watch(breakpoints.watch, {interval: 4000}, ['breakpoints']);
  // gulp.watch(sketch.watch, {interval: 4000}, ['sketch'/*,'iconfont'*/]);
  gulp.watch(iconfont.watch, {interval: 4000}, ['iconfont']);
});
