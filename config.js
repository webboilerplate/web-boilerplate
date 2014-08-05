'use strict';

var env = process.env.NODE_ENV ||  'development';
var ip = require('ip');
var path = require('path');

var folders = {
  src: 'src',
  dest: 'dist',
  tmp: '.tmp',

  jade: 'assets/jade',

  assets: {
    root: 'assets',
    images: 'assets/images',
    sprites: 'assets/images/sprites',
    fonts: 'assets/fonts',
    js: 'assets/js',
    css: 'assets/css',
    scss: 'assets/scss',
    stylus: 'assets/stylus'
  },

  components: 'src/assets/components',
};


// folders.tmpAssets = path.join(folders.tmp, folders.assets.root) + '/';
// folders.srcAssets = path.join(folders.src, folders.assets.root) + '/';
// folders.destAssets = path.join(folders.dest, folders.assets.root) + '/';


module.exports = {

  folders: folders,

  js: {

    main: 'main.js',
    out: 'app.js',

    shim: {
      //example: {
      //  path: path.join(folders.src, folders.assets, 'js/app/vendor/example.js' )
      //  exports: 'Example',
      //  depends: {
      //    jquery: 'jQuery',
      //  }
      //}
    }
  },


  styles: {

    //have one or more preprocessors.
    preprocessor: ['scss'],

    css: {
      main: 'main.css',
      out: 'main.css',
    },

    stylus: {
      main: 'main.styl',
      out: 'main.css'
    },

    scss: {
      main: 'main.scss',
      out: 'main.css'
    }
  },


  images: {
    sprites: {
      src: '*.png'
    }
  },

  autoprefixer: {
    def: [
      'ie >= 9',
      'ie_mob >= 9',
      'ff >= 30',
      'chrome >= 30',
      'safari >= 7',
      'opera >= 23',
      'ios >= 6',
      'android >= 3.0',
      'bb >= 10'
    ],

    mobile: [
      'last 1 version',
      'ios 6',
      'android 4'
    ]
  },

  deploy: {
    ssh: {
      dest: env === 'development' ? 'user@server.com:/var/www/dev/' : 'user@server.com:/var/www/live/'
    }
  }
};
