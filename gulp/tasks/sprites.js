'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var runSequence = require('run-sequence');

var config = require('../config');
var folders = config.folders;

/*******************************************************************************
     SPRITE TASK
*******************************************************************************/

gulp.task('sprite@2x', function() {
  var spriteData = gulp.src(folders.src + '/' + folders.assets.sprites + '/*@2x.{png,jpg,gif}')
    .pipe(spritesmith({
      imgName: 'sprite@2x.png',
      imgPath: '../images/sprite@2x.png',
      padding: 20,
      cssName: 'sprites-2x.' + config.styles.preprocessor
    }));

  return spriteData.img.pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));
});


gulp.task('sprite', function() {
  var spriteData = gulp.src([folders.src + '/' + folders.assets.sprites + '/*.{png,jpg,gif}', '!' + folders.src + '/' + folders.assets.sprites + '/*@2x.{png,jpg,gif}'])
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprites.' + config.styles.preprocessor,
      padding: 10,
      cssTemplate: config.styles.preprocessor === 'scss' ? './lib/spritesmith.scss.tpl.mustache' : './lib/spritesmith.spritesmith.stylus.tpl.mustache',
      cssVarMap: function(sprite) {
        sprite.image = sprite.image.replace('.png', '');
      },
    }));

  spriteData.img.pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));
  return spriteData.css.pipe(gulp.dest(folders.src + '/' + folders.assets.scss + '/app/utils/'));

});



gulp.task('sprites', function(cb) {
  runSequence(['sprite@2x', 'sprite'], cb);
});
