'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var runSequence = require('run-sequence');

var config = require('../config');
var paths = config.paths;

/*******************************************************************************
     SPRITE TASK
*******************************************************************************/

//see http://frontendbabel.info/articles/css-sprites-with-gulp/

gulp.task('sprite@2x', function() {
  var spriteData = gulp.src(paths.src + '/' + paths.sprites + '/*@2x.{png,jpg,gif}')
    .pipe(spritesmith({
      imgName: 'sprite@2x.png',
      imgPath: '../images/sprite@2x.png',
      padding: 20,
      cssName: 'sprites-2x.' + config.preprocessor
    }));

  return spriteData.img.pipe(gulp.dest(paths.tmp + '/' + paths.images));
});


gulp.task('sprite', function() {
  var spriteData = gulp.src([paths.src + '/' + paths.sprites + '/*.{png,jpg,gif}', '!' + paths.src + '/' + paths.sprites + '/*@2x.{png,jpg,gif}'])
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprites.' + config.preprocessor,
      padding: 10,
      cssTemplate: config.preprocessor === 'scss' ? './lib/spritesmith.scss.tpl.mustache' : './lib/spritesmith.stylus.tpl.mustache',
      cssVarMap: function(sprite) {
        sprite.image = sprite.image.replace('.png', '');
      },
    }));

  spriteData.img.pipe(gulp.dest(paths.tmp + '/' + paths.images));
  return spriteData.css.pipe(gulp.dest(paths.src + '/' + paths.scss + '/app/utils/'));

});



gulp.task('sprites', function(cb) {
  runSequence(['sprite@2x', 'sprite'], cb);
});
