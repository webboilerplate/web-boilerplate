'use strict';

var gulp      = require('gulp');
var svgSprite = require('gulp-svg-sprites');
var filter    = require('gulp-filter');
var svg2png   = require('gulp-svg2png');
var config    = require('../config/svgsprite');
var cleanSketch = require('gulp-clean-sketch');
var path = require('path');



gulp.task('svgsprite', function() {
  return gulp.src(config.src)
      // .pipe(cleanSketch())
      .pipe(svgSprite( config.settings ))
      .pipe(gulp.dest(config.dest)) // Write the sprite-sheet + CSS + Preview
      .pipe(filter('**/*.svg'))  // Filter out everything except the SVG file
      .pipe(svg2png())           // Create a PNG
      .pipe(gulp.dest(config.dest));
});
