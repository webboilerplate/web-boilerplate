'use strict';

var gulp = require('gulp');
var iconfont    = require('../config/iconfont');
var sprites = require('../config/sprites');
var styles = require('../config/styles');
var images = require('../config/images');

var html = require('../config/html');

var fonts = require('../config/fonts');
var sketch = require('../config/sketch');
var breakpoints = require('../config/breakpoints');

/*******************************************************************************
    WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

  gulp.watch(styles.watch, ['styles']);
  gulp.watch(sprites.watch, { interval: 4000 }, ['sprites']);
  // gulp.watch(breakpoints.watch, { interval: 4000 }, ['breakpoints']);
  gulp.watch(iconfont.watch, { interval: 4000 }, ['iconfont']);
});
