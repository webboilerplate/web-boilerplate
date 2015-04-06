'use strict';

/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var config = require('../config/browserify');
var path = require('path');
var exorcist = require('exorcist');
// var buffer = require('vinyl-buffer');


gulp.task('browserify2', function(cb) {

  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: !gutil.env.production,
    entries: config.entries,
    debug: !gutil.env.production
  });


  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start(config.outputName);

    return bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source(config.outputName))
      /*.pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sourcemaps.write('./'))*/
      // .pipe(transform(function() {
      //   return exorcist(config.dest + '/' + config.outputName + '.map');
      // }))
      .pipe(gulp.dest(config.dest))
      .on('end', reportFinished);
  };

  if (global.watching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  var reportFinished = function() {
    bundleLogger.end(config.outputName);
  };

  return bundle();

});
