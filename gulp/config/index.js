'use strict';

var config = {

  preprocessor: 'stylus',

  path: {
    src: 'src',
    dest: 'dist',
    build: 'build',
    assets: 'assets',
    components: 'bower_components'
  }
};

config.path.sketch = config.path.assets + '/sketch';
config.path.svg = config.path.assets + '/svg';
config.path.images = config.path.assets + '/images';
config.path.base64 = config.path.assets + '/base64';
config.path.sprites = config.path.assets + '/sprites';
config.path.icons = config.path.assets + '/icons';
config.path.fonts = config.path.assets + '/fonts';
config.path.js = config.path.assets + '/js';
config.path.css = config.path.assets + '/css';
config.path.sass = config.path.assets + '/sass';
config.path.stylus = config.path.assets + '/stylus';
config.path.components = config.path.assets + '/components';

config.path.sassIncludePath = [
  config.path.build + '/' + config.path.sass,
  config.path.components
];

module.exports = config;
