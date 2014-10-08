'use strict';

var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;
var pkg = require('../../package.json');

var config = require('../config');
var folders = config.folders;


/*******************************************************************************
    RSYNC TASK
*******************************************************************************/

// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('rsync', function(cb) {

  rsync({
    // args: ['--verbose'],
    args: ['--verbose --compress --recursive --checksum --itemize-changes --delete -e'],
    src: './' + folders.dest + '/',
    exclude: ['.git', '.DS_Store', '.gitattributes', '.gitignore'],
    ssh: true,
    dest: config.deploy.ssh.dest,
    recursive: true,
    syncDestIgnoreExcl: true,
    dryRun: false
  }, function(err, stdout, stderr, cmd) {
    console.log('Shell command was: ' + cmd);

    if (err) {
      cb(err);
    } else {
      console.log(stdout);
      cb();
    }
  });

});
