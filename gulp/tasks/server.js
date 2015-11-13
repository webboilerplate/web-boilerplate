'use strict';

var gulp = require('gulp');
var SSH = require('ssh2');

var config = require('../config/deploy');
var paths = config.paths;

var sshConfig = config[process.env.NODE_ENV || 'development'];
sshConfig.agent = process.env.SSH_AUTH_SOCK;

//
// RESTART NODE PROCESS ON TEST SERVER TASK
//

var Connection = function(options, cb) {
  var c = new SSH();

  var cmd = '';
  var ignoreErrors = false;
  var finalError;

  if (typeof options === 'object') {
    cmd = options.cmd;
    ignoreErrors = options.ignoreErrors === true;
  } else if (typeof options === 'string') {
    cmd = options;
  } else {
    cb(new Error('ssh no options supplied'));
  }

  var allDone = function(err) {
    if (ignoreErrors) {
      err = null;
    }

    finalError = err;
    c.end();
  };

  c.on('ready', function() {
    console.log('>>>>>>>>>>>>>>>> ready');

    c.shell(function(err, stream) {
      var exitError;

      if (err) {
        allDone(err);
        return;
      }

      stream.on('close', function() {
        console.log('Stream :: close');
        if (exitError) {
          console.error(exitError);
          allDone(exitError);
        } else {
          allDone();
        }
      }).on('data', function(data) {
        // console.log('STDOUT: ' + data);
        process.stdout.write(data);
      }).on('exit', function(code, signal) {
        if (code !== 0) {
          exitError = new Error('ssh error: code: ' + code + ' signal: ' + signal);
        }
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });

      stream.end(cmd + '\nexit\n');
    });
  });

  c.on('error', function(err) {
    console.log('>>>>>>>>>>>>>>>> ssh error', err);
  });

  c.on('end', function() {
    console.log('>>>>>>>>>>>>>>>> ssh end');
  });

  c.on('close', function(hadError) {
    console.log('>>>>>>>>>>>>>>>> ssh close', finalError);

    cb(finalError);
  });

  c.connect(sshConfig);
};

//
//
gulp.task('server:reload', function(cb) {
  new Connection({
    cmd: 'cd /var/www/html/ && npm install --production && pm2 startOrRestart ./server/pm2.json',
    ignoreErrors: false
  }, cb);
});
