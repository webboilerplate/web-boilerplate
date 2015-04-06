var config = require('./');
var path = require('path');

module.exports = {

  src: path.resolve(config.path.src, config.path.sass) + '/*.{sass,scss}',
  dest: path.resolve(config.path.build, config.path.css),


  settings: {
    css: config.path.build + '/' + config.path.css,
    sass: config.path.src + '/' + config.path.sass,
    image: config.path.src + '/' + config.path.images,
    javascripts: config.path.src + '/' + config.path.js,
    fonts: config.path.src + '/' + config.path.fonts,
    import_path: config.path.includePath
      //, require: ['susy', 'modular-scale']
  }

};
