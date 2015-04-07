'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var runSequence = require('run-sequence');

var mergeStream = require('merge-stream');

var _ = require('lodash');

var config = require('../config/sprites');

/*******************************************************************************
     SPRITE TASK
*******************************************************************************/

//see http://frontendbabel.info/articles/css-sprites-with-gulp/



var spritesTask = function() {

  var createSprite = function(settings) {
    // console.log(settings);
    var spriteData = gulp.src(settings.src)
      .pipe(spritesmith(settings.spritesmith));
    return spriteData.img.pipe(gulp.dest(settings.dest ||  config.dest));
  };

  return mergeStream.apply(gulp, _.map(config.sprites, createSprite));
};



gulp.task('sprites', function(cb) {
  return spritesTask();
});
