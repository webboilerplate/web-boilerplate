var pkg = require('../package.json');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var npm = require('npm');

var semver = require('./semver');

var ANSI_CODES = {
  "off": 0,
  "bold": 1,
  "italic": 3,
  "underline": 4,
  "blink": 5,
  "inverse": 7,
  "hidden": 8,
  "black": 30,
  "red": 31,
  "green": 32,
  "yellow": 33,
  "blue": 34,
  "magenta": 35,
  "cyan": 36,
  "white": 37,
  "black_bg": 40,
  "red_bg": 41,
  "green_bg": 42,
  "yellow_bg": 43,
  "blue_bg": 44,
  "magenta_bg": 45,
  "cyan_bg": 46,
  "white_bg": 47
};

function setColor(str,color) {
  if (!color) {
    return str;
  }

  var colorAttr = color.split("+");
  var ansiStr = "";
  
  for (var i=0, attr; attr = colorAttr[i]; i++) {
    ansiStr += "\033[" + ANSI_CODES[attr] + "m";
  }

  ansiStr += str + "\033[" + ANSI_CODES["off"] + "m";
  return ansiStr;
}

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
  npm.load(pkg, function(err) {
    if (err) {
      console.error('error while loading package.json :: ', err);
      process.exit(1);
    }

    npm.commands.install(function(err, data) {
      if (err) {
        console.error('npm install failed :: ', err);
        process.exit(1);
      }
      console.log('success - installed all dependencies');

      fs.writeFile(localHashPath, currentHash, function(err) {
        if (err) {
          console.error('error while writing hash to disk :: ', err);

        } else {
          console.log(localHashPath + ' written to disk');
        }
      });
    });
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
