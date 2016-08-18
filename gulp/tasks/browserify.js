'use strict';


var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var mergeStream = require('merge-stream');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundleLogger');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config/browserify');
var _ = require('lodash');

var browserifyTask = function(watchMode) {

  var browserifyThis = function(bundleConfig) {

    var options = bundleConfig.options;
    var isProduction = process.env.NODE_ENV === 'production';
    console.log('isProduction', isProduction);

    if (watchMode) {
      // Add watchify args and debug (sourcemaps) option
      _.extend(options, watchify.args, {
        debug: true,
      });
      // A watchify require/external bug that prevents proper recompiling,
      // so (for now) we'll ignore these options during development. Running
      // `gulp browserify` directly will properly require and externalize.
      options = _.omit(options, ['external', 'require']);
    }

    //TODO check
    _.extend(options, {
      fullPaths: !isProduction,
      debug: !isProduction,
    });

    var b = browserify(options);

    var bundle = function() {
      // Log when bundling starts

      return b
        .transform(babelify)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(gulpif(!isProduction, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(!isProduction, sourcemaps.write('./')))
        .pipe(gulp.dest(bundleConfig.dest));
    };

    if (watchMode) {
      b = watchify(b);
      b.on('update', bundle);
      b.on('log', gutil.log);
    } else {
      if (options.require) b.require(options.require);
      if (options.external) b.external(options.external);
    }

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  return mergeStream.apply(gulp, _.map(config.bundleConfigs, browserifyThis));

};

gulp.task('browserify', function() {
  return browserifyTask(false);
});

// Exporting the task so we can call it directly in our watch task, with the 'watchMode' option
module.exports = browserifyTask;
