'use strict';

var env = process.env.NODE_ENV ||  'development';
var path = require('path');

var folders = {
  src: 'src',
  dest: 'dist',
  tmp: '.tmp',

  jade: 'assets/jade',

  assets: {
    root: 'assets',
    images: 'assets/images',
    sprites: 'assets/images/_sprites',
    fonts: 'assets/fonts',
    js: 'assets/js',
    css: 'assets/css',
    scss: 'assets/scss',
    stylus: 'assets/stylus'
  },

  components: 'src/assets/components',
};


module.exports = {

  folders: folders,

  js: {

    main: 'main.js',
    out: 'app.js',

    shim: {
      /*picturefill: {
        path: folders.components + '/picturefill/src/picturefill.js',
        exports: 'picturefill'
      },
      fixedsticky: {
        path: folders.src + '/assets/js/app/libs/fixedsticky.js',
        exports: 'fixedsticky',
        depends: {
          jquery: 'jQuery',
        }
      }*/
    }
  },


  styles: {

    //have one or more preprocessors.
    preprocessor: ['stylus'],

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
      'ie >= 8',
      'ie_mob >= 9',
      'ff >= 12',
      'chrome >= 20',
      'safari >= 5',
      'opera >= 1',
      'ios >= 6',
      'android >= 3.0',
      'bb >= 10'
    ],

    mobile: [
      'last 2 version',
      'ios 6',
      'android 3'
    ]
  },

  deploy: {
    ssh: {
      dest: env === 'development' ? 'user@server.com:/var/www/dev/' : 'user@server.com:/var/www/live/'
    }
  }
};
