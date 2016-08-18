var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var config = require('../config');
var fontName = 'icons';

gulp.task('iconfont', function(){
  return gulp.src(['src/assets/iconfont/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'lib/_iconfont.scss',
      targetPath: '../sass/_iconfont.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      formats: ['ttf', 'eot', 'woff','woff2', 'svg'],
      fontName: fontName
     }))
    .pipe(gulp.dest('build/assets/fonts/'));
});
