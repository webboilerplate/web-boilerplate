'use strict';

var env = process.env.NODE_ENV ||  'development';
var ip = require('ip');


var folders = {
  src: 'src',
  dest: 'dist',
  bower: 'src/assets/components',
  tmp: '.tmp',
  componentsPath: 'src/assets/components'
};



module.exports = {

  folders: folders,

  js: {

    shim: {
      // picturePolyfill: {
      //     path: folders.bower + '/picturePolyfill/src/picturePolyfill.js',
      //     exports: 'picturePolyfill'
      // }
    }
  },

  css: {
    preprocessor: 'scss'
  },

  server: {
    app: {
      host: ip.address(),
      port: 9000,
      protocol: 'http://'
    },
    dist: {
      host: ip.address(),
      port: 9001,
      protocol: 'http://'
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
    rsync: {
      dest: env === 'development' ? 'user@server.com:/var/www/dev/' : 'user@server.com:/var/www/live/'
    }
  }
};
