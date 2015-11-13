var config = require('./');
var path = require('path');

module.exports = {

  watch: config.path.src + '/' + config.path.stylus + '/**/*.styl',
  src: path.resolve(config.path.src, config.path.stylus) + '/*.styl',
  dest: path.resolve(config.path.build, config.path.css),

  settings: {
    //use: nib(),
    linenos: true,
    sourcemap: {
      inline: true,
      sourceRoot: '..',
      basePath: 'css'
    },
    url: {
      name: 'embedurl',
      paths: [__dirname + '/' + config.path.src + '/' + config.path.images],
      limit: false
    },
    error: true
  }

};
