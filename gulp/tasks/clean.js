var gulp = require('gulp');
var del = require('del');
var config = require('../config/clean');

/*******************************************************************************
    CLEAN  TASK
*******************************************************************************/


gulp.task('clean', ['clean:dest']);
gulp.task('clean:dest', del.bind(null, config.dest));
gulp.task('clean:build', del.bind(null, config.build));
