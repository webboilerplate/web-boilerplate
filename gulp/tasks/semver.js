'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var tap = require('gulp-tap');

var pkg = require('../../package.json');

/*******************************************************************************
    SEMVER TASK
*******************************************************************************/


gulp.task('bump:patch', function() {
  return gulp.src('./package.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));

});

gulp.task('bump:minor', function() {
  return gulp.src('./package.json')
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));

});

gulp.task('bump:major', function() {
  return gulp.src('./package.json')
    .pipe(bump({
      type: 'major'
    }))
    .pipe(tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));
});
