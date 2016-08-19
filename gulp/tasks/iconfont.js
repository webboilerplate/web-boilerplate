var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var config = require('../config/iconfont');

gulp.task('iconfont', function() {
  return gulp.src(config.src)
    .pipe(iconfontCss({
      fontName: config.fontName,
      path: config.template,
      targetPath: config.targetPath,
      fontPath: config.fontPath
    }))
    .pipe(iconfont({
      formats: config.formats,
      fontName: config.fontName
    }))
    .pipe(gulp.dest(config.dest));
});
