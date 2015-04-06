var config = require('./');

module.exports = {
  src: [
    config.path.src + '/' + config.path.js + '/**/*.js',
    '!' + config.path.src + '/' + config.path.js + '/vendor/**',
    '!' + config.path.src + '/' + config.path.js + '/app/libs/**',
    '!' + config.path.src + '/' + config.path.js + '/app/polyfills/**'
  ]

};
