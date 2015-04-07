var config = require('./');
var path = require('path');

module.exports = {

  src: path.resolve(config.path.src, config.path.sass) + '/*.{sass,scss}',
  dest: path.resolve(config.path.build, config.path.css),
  watch: path.resolve(config.path.src, config.path.sass) + '/**/*.{sass,scss}',

  settings: {
    //indentedSyntax: true, // Enable .sass syntax!
    imagePath: config.path.images, // Used by the image-url helper
    includePaths: config.path.includePaths,
    outputStyle: 'nested'
  },

  base64: {
    baseDir: config.path.src + '/' + config.path.base64,
    // extensions: ['svg', 'png', /\.jpg#datauri$/i],
    exclude: ['_base64'],
    maxImageSize: 50 * 1024, // bytes
    debug: false
  }
};
