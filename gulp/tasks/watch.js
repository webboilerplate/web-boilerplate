'use strict';

var gulp = require('gulp');
var iconfont    = require('../config/iconfont');
var sprites = require('../config/sprites');
var styles = require('../config/styles');
var images = require('../config/images');

var html = require('../config/html');

var fonts = require('../config/fonts');
var browserSync = require('browser-sync');
var sketch = require('../config/sketch');
var breakpoints = require('../config/breakpoints');
var reload = browserSync.reload;

/*******************************************************************************
    WATCH TASK
*******************************************************************************/

gulp.task('watch'/*, ['watchify', 'browserSync']*/, function() {

  gulp.watch(styles.watch, ['styles']);
  gulp.watch(html.watch, { interval: 2000 }).on('change', reload);
  gulp.watch(sprites.watch, { interval: 4000 }, ['sprites']);
  // gulp.watch(breakpoints.watch, { interval: 4000 }, ['breakpoints']);
  // gulp.watch(sketch.watch, {interval: 4000}, ['sketch'/*,'iconfont'*/]);
  gulp.watch(iconfont.watch, { interval: 4000 }, ['iconfont']);
});
