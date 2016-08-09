'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config/clean');
var sketch = require('../config/sketch');

var runSequence = require('run-sequence');

//
// CLEAN  TASK
//

gulp.task('clean:dist', del.bind(null, config.dest));
gulp.task('clean:build', del.bind(null, config.build));
gulp.task('clean:public', del.bind(null, config.public));
gulp.task('clean:sketch', del.bind(null, sketch.dest));


gulp.task('clean', function(cb) {
  runSequence(['clean:dist', 'clean:build', 'clean:public' , 'clean:sketch'], cb);
});
