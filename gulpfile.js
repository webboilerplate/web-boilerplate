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

gulp.task('build', function(cb) {
  runSequence('clean:build', 'sketch', 'sprites', [
    // 'fonts',
    //'iconfont',
    'svgsprite',
    'breakpoints',
    'images',
    'html'
  ], [
    'scripts',
    'styles'
  ], cb);
});


gulp.task('default', function(cb) {
  runSequence('build', 'watch', cb);
});


gulp.task('dist', function(cb) {
  runSequence('clean', 'build', [
      'js:dist',
      'vendor:dist',
      'css:dist',
      'fonts',
      'images:dist',
      'server:dist',
      'pkg:dist'
    ],
    'html:src:dist',
    cb);
});

gulp.task('deploy', function(cb) {
  runSequence('dist', 'publish', 'server:reload', cb);
});


gulp.task('release', function(cb) {
  runSequence('bump:patch', 'deploy', cb);
});


gulp.task('styles', function(cb) {
  switch (config.preprocessor) {
    case 'sass':
      runSequence(['scsslint', 'sass'], cb);
      break;
    case 'stylus':
      runSequence('stylus', cb);
      break;
    default:
      cb();
  }
});

gulp.task('scripts', function(cb) {
  runSequence('jshint', 'browserify', cb);
});

gulp.task('publish', function(cb) {
  runSequence('rsync', cb);
});
