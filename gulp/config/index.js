'use strict';

var config = {

  preprocessor: 'sass',

  path: {
    src: 'src',
    dest: 'dist',
    build: 'build',
    assets: 'assets',
    components: 'bower_components'
  }
};


config.path.jade = config.path.assets + '/jade';
config.path.images = config.path.assets + '/images';
config.path.base64 = config.path.assets + '/base64';
config.path.sprites = config.path.assets + '/sprites';
config.path.fonts = config.path.assets + '/fonts';
config.path.js = config.path.assets + '/js';
config.path.css = config.path.assets + '/css';
config.path.sass = config.path.assets + '/sass';
config.path.stylus = config.path.assets + '/stylus';

config.path.includePath = [
  config.path.components
];

module.exports = config;
