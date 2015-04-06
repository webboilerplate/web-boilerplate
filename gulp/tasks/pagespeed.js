'use strict';

var gulp = require('gulp');
var psi = require('psi');
var _ = require('lodash');
var config = require('../config/pagespeed');
var mergeStream = require('merge-stream');

/*******************************************************************************
    PAGESPEED TASK
*******************************************************************************/

// Run PageSpeed Insights
gulp.task('pagespeed', function() {

  var psiTask = function(conf) {
    var t = conf.title ||  '';
    return psi(conf.site, conf.settings, function(err, data) {
      console.log('\n\n##### ' + t + ' #####');
      console.log('score:', data.score);
      console.log('pageStats:', data.pageStats);
    });
  };

  return mergeStream.apply(gulp, _.map(config, psiTask));
});
