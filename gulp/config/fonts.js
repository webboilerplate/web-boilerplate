var config = require('./');
var path = require('path');

module.exports = {
  src: path.resolve(config.path.src, config.path.fonts) + '/**/*',
  dest: path.resolve(config.path.build, config.path.fonts)
};