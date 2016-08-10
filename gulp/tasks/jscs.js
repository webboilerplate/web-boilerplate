var gulp = require('gulp');
var jscs = require('gulp-jscs');
var foreach = require('gulp-foreach');
var changed = require('gulp-changed');
var rimraf = require('gulp-rimraf');
var config = require('../config');
var flatmap = require('gulp-flatmap');

gulp.task('jscs', (cb) => {
    gulp.src(config.path.src + '/' + config.path.js +  '/**/*.js')
   // .pipe(changed(config.path.src + '/' + config.path.js +  '/**/*.js'/*, {hasChanged: changed.compareSha1Digest}*/))
   .pipe(flatmap(function(stream, file) {
    // console.log(file.base);
         return stream
            .pipe(jscs({fix: false}))
            .pipe(jscs.reporter())
            //.pipe(jscs.reporter('fail'))
            // .pipe(rimraf())
            // .pipe(gulp.dest(file.base));
      }));
    cb();
  });
