/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.

  all main tasks are listed here
*/

'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('./gulp/config');

require('require-dir')('./gulp/tasks', {
  recurse: true
});



/*******************************************************************************
    MAIN TASKS
*******************************************************************************/

gulp.task('default', function(cb) {
  runSequence('sprites', ['scripts', 'styles'], cb);
});

gulp.task('dev', function(cb) {
  runSequence('default', 'browserSync:dev', 'watch', cb);
});

gulp.task('dist', function(cb) {
  runSequence('clean', 'default', [
      'js:dist',
      'vendor:dist',
      'css:dist',
      'fonts:dist',
      'images:dist',
      'pkg:dist'
    ],
    'html:src:dist',
    'html:tmp:dist',
    cb);
});

gulp.task('deploy', function(cb) {
  runSequence('dist', 'publish');
});

gulp.task('release', function(cb) {
  runSequence('bump:patch', 'dist', 'publish');
});


/*******************************************************************************
    TASKS
*******************************************************************************/

gulp.task('styles', function(cb) {

  switch (config.styles.preprocessor) {
    case 'scss':
      runSequence('scsslint', 'scss', 'csslint', cb);
      break;
    case 'stylus':
      runSequence('stylus', 'csslint', cb);
      break;
    default:
      cb();
  }
});

gulp.task('scripts', function(cb) {
  runSequence('jshint', 'js', cb);
});

gulp.task('publish', function(cb) {
  runSequence('rsync', cb);
});
