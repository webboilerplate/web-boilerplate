var config = require('./');
var path = require('path');

module.exports = {

  src: config.path.src + '/**/*.html',
  dest: config.path.build,

};
