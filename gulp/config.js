'use strict';

var env = process.env.NODE_ENV ||  'development';

var paths = {

  src: './src',
  dest: './dist',
  tmp: './.tmp',

  jade: 'assets/jade',
  images: 'assets/images',
  sprites: 'assets/images/_sprites',
  fonts: 'assets/fonts',
  js: 'assets/js',
  css: 'assets/css',
  scss: 'assets/scss',
  stylus: 'assets/stylus',

  components: 'src/assets/components',
};


module.exports = {

  paths: paths,

  browserSync: {
    notify: false,
    server: {
      baseDir: [paths.tmp, paths.src]
    }
  },

  js: {

    main: 'main.js',
    out: 'app.js',

    /*shim: {
      picturefill: {
        path: paths.components + '/picturefill/src/picturefill.js',
        exports: 'picturefill'
      },
      fixedsticky: {
        path: paths.src + '/assets/js/app/libs/fixedsticky.js',
        exports: 'fixedsticky',
        depends: {
          jquery: 'jQuery',
        }
      }
    }*/
  },

  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extentions to make optional
    extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: paths.src + '/' + paths.js + '/' + 'main.js',
      dest: paths.dest,
      outputName: 'app.js'
    }, {
      entries: paths.src + '/' + paths.js + '/' + 'head.js',
      dest: paths.dest,
      outputName: 'head.js'
    }]
  },

  preprocessor: 'stylus',

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
