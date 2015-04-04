var pkg = require('../package.json');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var spawn = require('./spawn');

var setColor = require('./setcolor');
var semver = require('./semver');



console.log('\n---------------------------------------------');

// do something when app is closing
process.on('exit', function(e) {
  console.log('---------------------------------------------\n ');
});



// node version ----------------------------------------------------------------

var failedVersionCheck = false;

try {
  var currentNodeVersion = process.version.replace(/^v/, '');
  var requiredNodeVersion = pkg.engines.node;

  if (!semver.satisfies(currentNodeVersion, pkg.engines.node)) {
    console.log(setColor('node version incompatible.', 'red+bold'));
    console.log('you use ' + currentNodeVersion);
    console.log('should be ' + pkg.engines.node);
    failedVersionCheck = true;
  }

} catch (err) {
  console.log('error while trying to identify node version', err);
}

if (failedVersionCheck) {
  process.exit(1);
}

// NPM dependencies ------------------------------------------------------------

var localHashPath = path.resolve(__dirname , '../', '.package.sha1');

var install = function() {
  var child = spawn('npm', ['install'], {
    cwd: path.resolve(__dirname , '../')
  });

  console.log(setColor('installing/updating npm modules', 'green+bold'));

  child.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
  child.stderr.on('data', function(data) {
    process.stdout.write(setColor(data, 'red+bold'));
  });
  // when the spawn child process exits, check if there were any errors
  child.on('exit', function(code) {
    if (code !== 0) {
      console.error(setColor('\n\nnpm install failed :: ' + code, 'red+bold'));
      process.exit(1);

    } else {
      console.log(setColor('\n\nsuccess - installed all dependencies', 'green+bold'));

      fs.writeFile(localHashPath, currentHash, function(err) {
        if (err) {
          console.error('error while writing hash to disk :: ', err);

        } else {
          console.log(localHashPath + ' written to disk');
        }
      });
    }
  });
};

var currentHash = null;
var localHash = null;

var hashOfDeps = '';
hashOfDeps += JSON.stringify(pkg.dependencies);
hashOfDeps += JSON.stringify(pkg.devDependencies);

var hash = crypto.createHash('sha1');
hash.update(hashOfDeps);
currentHash = hash.digest('hex');

if (fs.existsSync(localHashPath)) {
  var hashFromFile = fs.readFileSync(localHashPath).toString();
  if (hashFromFile !== currentHash) {
    install();
  } else {
    console.log(setColor('everything seems to be up to date.', 'green+bold'));
    console.log('if you still get an error when trying to \n\'npm start\', run \'npm install\' manually first');
  }
} else {
  install();
}
