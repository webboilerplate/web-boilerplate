'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config/clean');
var sketch = require('../config/sketch');

//
// CLEAN  TASK
//

gulp.task('clean', ['clean:dest']);
gulp.task('clean:dest', del.bind(null, config.dest));
gulp.task('clean:build', del.bind(null, config.build));
gulp.task('clean:sketch', del.bind(null, sketch.dest));
