'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('styles', [config.preprocessor]);

// gulp.task('styles', function(cb) {
//   switch (config.preprocessor) {
//     case 'sass':
//       runSequence(['sass'], cb);
//       break;
//     case 'stylus':
//       runSequence('stylus', cb);
//       break;
//     default:
//       cb();
//   }
// });
