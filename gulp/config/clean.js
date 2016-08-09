'use strict';

var config = require('./');
var path = require('path');

//
//
//

module.exports = {
  // delete the dist folder but everything git and Readme or package.json
  dest: [
    config.path.dest + '/**/*',
    config.path.dest + '/.*',
    '!' + config.path.dest + '.git*',
    '!' + config.path.dest + '/README.md',
    '!' + config.path.dest + '/CHANGELOG.md',
    '!' + config.path.dest + '/package.json'
  ],

  build: [
    config.path.build + '/**/*'
  ],

  public: [
    config.path.public + '/**/*'
  ]
};
