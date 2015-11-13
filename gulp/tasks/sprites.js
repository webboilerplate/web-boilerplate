'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var spritesmith = require('gulp.spritesmith');
var mergeStream = require('merge-stream');

var config = require('../config/sprites');

//
// SPRITE TASK
//

//
// see http://frontendbabel.info/articles/css-sprites-with-gulp/
var spritesTask = function() {
  var createSprite = function(settings) {
    var spriteData = gulp.src(settings.src).pipe(spritesmith(settings.spritesmith));

    if (settings.cssDest) {
      spriteData.css.pipe(gulp.dest(settings.cssDest));
    }

    return spriteData.img.pipe(gulp.dest(settings.dest || config.dest));
  };

  return mergeStream.apply(gulp, _.map(config.sprites, createSprite));
};

//
//
gulp.task('sprites', function(cb) {
  return spritesTask();
});
