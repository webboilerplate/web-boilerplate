'use strict';

var gulp      = require('gulp');
var svgSprite = require('gulp-svg-sprites');
var filter    = require('gulp-filter');
var svg2png   = require('gulp-svg2png');
var config    = require('../config/svgsprite');

// var config = {
//     templates: {
//         css: require('fs').readFileSync('./lib/svgsprites.scss', 'utf-8')
//     }
// };

gulp.task('svgsprite', function() {
  return gulp.src(config.src)
      .pipe(svgSprite({
          // mode: 'symbols',
          // selector: 'svg-%f',
          common: 'svg-icon',
          cssFile: 'sass/_svgsprite.scss',
          preview: false,
          svg: {
            sprite: 'images/svgsprite.svg'
          }
        }))
      .pipe(gulp.dest(config.dest)) // Write the sprite-sheet + CSS + Preview
      .pipe(filter('**/*.svg'))  // Filter out everything except the SVG file
      .pipe(svg2png())           // Create a PNG
      .pipe(gulp.dest(config.dest));
});
