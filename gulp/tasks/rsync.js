'use strict';

var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;
var pkg = require('../../package.json');

var config = require('../config/deploy');

var sshConfig = config[process.env.NODE_ENV ||  'development'];
sshConfig.agent = process.env.SSH_AUTH_SOCK;

/*******************************************************************************
    DEPLOY TASK
*******************************************************************************/

// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('rsync', function(cb) {

  rsync({
    args: ['--verbose'],
    src: config.src,
    exclude: ['.git', '.DS_Store', '.gitattributes', '.gitignore', 'node_modules'],
    ssh: true,
    dest: sshConfig.username + '@' + sshConfig.host + ':' + sshConfig.path,
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
