var gulp = require('gulp');
var gutil  = require('gulp-util')
var config = require('../config/sketch');
var sketch = require('gulp-sketch');
var which  = require('npm-which')(__dirname);

gulp.task('sketch', ['clean:sketch'], function() {

  try {
    which.sync('sketchtool');
  } catch (error) {
    gutil.log(error); return;
  }

  return gulp.src(config.src)
    .pipe(sketch(config.settings))
    .pipe(gulp.dest(config.dest));
});
