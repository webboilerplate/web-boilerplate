'use strict';

var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var config           = require('../../config/iconfont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../util/handleErrors');
var sketch = require("gulp-sketch");
var consolidate = require('gulp-consolidate');
var cleanSketch = require('gulp-clean-sketch');
var rename = require('gulp-rename');

// gulp.task('iconfont', function() {
//   return gulp.src(config.src)
//     .pipe(iconfont(config.options))
//     .on('error', handleErrors)
//     .on('codepoints', generateIconSass)
//     .on('glyphs', generateIconSass)
//     .pipe(gulp.dest(config.dest));
// });


gulp.task('iconfont', function() {
  return gulp.src(config.src)
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg',
      clean: true
    }))
    .pipe(cleanSketch())
    .pipe(iconfont(config.options))
    .on('codepoints', function(codepoints, options) {
      // CSS templating, e.g.
      console.log(codepoints, options);
    })
    .on('glyphs', function(glyphs) {

      // console.log(glyphs);

      var options = {
        comment: '',
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return {
            name: glyph.name,
            codepoint: glyph.unicode[0].charCodeAt(0)
          };
        }),
        fontName: config.options.fontName,
        fontPath: config.fontPathCss,
        className: config.className
      };
      gulp.src('./gulp/tasks/iconfont/template.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: '_icons',
          extname: '.scss'
        }))
        .pipe(gulp.dest(config.sassDest)); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      // gulp.src('templates/' + template + '.html')
      //   .pipe(consolidate('lodash', options))
      //   .pipe(rename({ basename:'sample' }))
      //   .pipe(gulp.dest('dist/')); // set path to export your sample HTML
    })

    // dest of font
    .pipe(gulp.dest(config.fontPath)); // set path to export your fonts
});
