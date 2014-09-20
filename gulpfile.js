'use strict';

/*******************************************************************************
    DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var scsslint = require('gulp-scss-lint');


var runSequence = require('run-sequence');
var pagespeed = require('psi');
var fs = require('fs');
var rsync = require('rsyncwrapper').rsync;
var pkg = require('./package.json');

var spritesmith = require('gulp.spritesmith');

var stylish = require('jshint-stylish');

var path = require('path');
var config = require('./config');
var folders = config.folders;




/*******************************************************************************
    Helper
*******************************************************************************/

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''
].join('\n');



var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


/*******************************************************************************
    FILE / PATH / SHIM  CONFIG
*******************************************************************************/


/*******************************************************************************
    CLEAN DEST TASK
*******************************************************************************/
gulp.task('clean', function() {
  return gulp.src(folders.dest, {
      read: false
    })
    .pipe($.rimraf());
  /*return gulp.src([
      path.join(folders.dest, folders.assets.css),
      path.join(folders.dest, folders.assets.js),
      path.join(folders.dest, folders.assets.fonts),
      path.join(folders.dest, folders.assets.images)
    ], {
      read: false
    })
    .pipe($.rimraf());*/
});


/*******************************************************************************
    CSS TASK
*******************************************************************************/


gulp.task('scss', function() {
  return gulp.src(folders.src + '/' + folders.assets.scss + '/' + config.styles.scss.main)
    .pipe($.plumber())
    .pipe($.sass({
      includePaths: folders.components,
      outputStyle: 'expanded'
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.css))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('compass', function() {
  return gulp.src(folders.src + '/' + folders.assets.scss + '/' + config.styles.scss.main)
    .pipe($.plumber())
    .pipe($.compass({
      css: folders.tmp + '/' + folders.assets.css,
      sass: folders.src + '/' + folders.assets.scss,
      image: folders.src + '/' + folders.assets.images,
      javascripts: folders.src + '/' + folders.assets.js,
      fonts: folders.src + '/' + folders.assets.fonts,
      import_path: folders.components
      //, require: ['susy', 'modular-scale']
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/css'))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('stylus', function() {
  return gulp.src(folders.src + '/' + folders.assets.stylus + '/' + config.styles.stylus.main)
    .pipe($.plumber())
    .pipe($.stylus({
      //use: nib(),
      url: {
        name: 'embedurl',
        paths: [__dirname + '/' + folders.src + '/' + folders.assets.images],
        limit: false
      },
      error: true
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.css))
    .pipe(reload({
      stream: true
    }));
});



// for rules see
// https://github.com/CSSLint/csslint/wiki/Rules-by-ID
gulp.task('csslint', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/**/*.css')
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});


gulp.task('scsslint', function() {
  gulp.src([folders.src + '/' + folders.assets.scss + '/**/*.scss', '!' + folders.src + '/' + folders.assets.scss + '/vendor/**'])
    .pipe(scsslint({
      'config': folders.src + '/' + folders.assets.scss + '/.scss-lint.yml',
    }));
});


gulp.task('stylestats', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/main.css')
    .pipe($.stylestats());
});


gulp.task('styles', function(cb) {

  switch (config.styles.preprocessor) {
    case 'scss':
      runSequence('scsslint', 'scss', 'csslint', cb);
      break;
    case 'stylus':
      runSequence('stylus', 'csslint', cb);
      break;
    default:
    cb();
  }
});





/*******************************************************************************
    JAVASCRIPT TASK
*******************************************************************************/

gulp.task('jshint', function() {
  return gulp.src([folders.src + '/' + folders.assets.js + '/**/*.js', '!' + folders.src + '/' + folders.assets.js + '/vendor/**', '!' + folders.src + '/' + folders.assets.js + '/app/libs/**'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});


gulp.task('js', function() {
  return gulp.src(folders.src + '/' + folders.assets.js + '/' + config.js.main)
    .pipe($.plumber())
    .pipe($.browserify({
      insertGlobals: false,
      debug: true,
      // transform: ['jstify', 'debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
      shim: config.js.shim
    }))
    .on('error', handleErrors)
    .pipe($.rename(config.js.out))
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.js))
    .pipe(reload({
      stream: true,
      once: true
    }));
});


gulp.task('scripts', function(cb) {
  runSequence('jshint', 'js', cb);
});




/*******************************************************************************
    IMAGES / SPRITE TASK
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src([folders.src + '/' + folders.assets.images + '/**/*', '!' + folders.src + '/' + folders.assets.images + '/_**/*', '!' + folders.src + '/' + folders.assets.images + '/_*'])
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .on('error', handleErrors)
    .pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));

});


gulp.task('sprite@2x', function() {
  var spriteData = gulp.src(folders.src + '/' + folders.assets.sprites + '/*@2x.{png,jpg,gif}')
    .pipe(spritesmith({
      imgName: 'sprite@2x.png',
      imgPath: '../images/sprite@2x.png',
      padding: 20,
      cssName: 'sprites-2x.scss'
    }));

  return spriteData.img.pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));
});


gulp.task('sprite', function() {
  var spriteData = gulp.src([folders.src + '/' + folders.assets.sprites + '/*.{png,jpg,gif}', '!' + folders.src + '/' + folders.assets.sprites + '/*@2x.{png,jpg,gif}'])
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprites.scss',
      padding: 10,
      cssTemplate: config.styles.preprocessor === 'scss' ? './lib/spritesmith.scss.tpl.mustache' : './lib/spritesmith.spritesmith.stylus.tpl.mustache',
      cssVarMap: function(sprite) {
        sprite.image = sprite.image.replace('.png', '');
      },
    }));

  spriteData.img.pipe(gulp.dest(folders.tmp + '/' + folders.assets.images));
  return spriteData.css.pipe(gulp.dest(folders.src + '/' + folders.assets.scss + '/app/sprite/'));

});


gulp.task('sprites', function(cb) {
  runSequence(['sprite@2x', 'sprite'], cb);
});


/*******************************************************************************
    TEMPLATE TASK
*******************************************************************************/


/*******************************************************************************
    SERVER TASK
*******************************************************************************/


/*******************************************************************************
    SEMVER TASK
*******************************************************************************/


gulp.task('bump:patch', function() {
  return gulp.src('./package.json')
    .pipe($.bump({
      type: 'patch'
    }))
    .pipe($.tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));

});

gulp.task('bump:minor', function() {
  return gulp.src('./package.json')
    .pipe($.bump({
      type: 'minor'
    }))
    .pipe($.tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));

});

gulp.task('bump:major', function() {
  return gulp.src('./package.json')
    .pipe($.bump({
      type: 'major'
    }))
    .pipe($.tap(function(file) {
      pkg = JSON.parse(file.contents.toString());
    }))
    .pipe(gulp.dest('./'));
});


/*******************************************************************************
    SETUP TASK
*******************************************************************************/




/*******************************************************************************
    BUILD / DIST TASK
*******************************************************************************/

gulp.task('js:dist', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.js + '/**/*.js')
    .pipe($.uglify())
    .pipe($.ignore.exclude(folders.tmp + '/' + folders.assets.js + '/vendor/**'))
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.js));
});


gulp.task('vendor:dist', function() {
  return gulp.src(folders.src + '/' + folders.assets.js + '/vendor/*.js')
    .pipe($.uglify())
    .pipe($.ignore.include(folders.tmp + '/' + folders.assets.js + '/vendor/*.htc'))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.js + '/vendor'));
});


gulp.task('css:dist', function() {
  return gulp.src(folders.tmp + '/' + folders.assets.css + '/**/*.css')
    .pipe($.minifyCss({
      // noRebase: true,
      // noAdvanced: true,
      // keepSpecialComments: 0,
      // compatibility: 'ie8'
    }))
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.css));
});

gulp.task('fonts:dist', function() {
  return gulp.src(folders.src + '/' + folders.assets.fonts + '/**/*')
    .pipe(gulp.dest(folders.dest + '/assets/fonts'));
});

// copy all content from images/* excapt prefixed with _
gulp.task('images:dist', function() {
  return gulp.src([folders.src + '/' + folders.assets.images + '/**/*', '!' + folders.src + '/' + folders.assets.images + '/_**/*', '!' + folders.src + '/' + folders.assets.images + '/_*', folders.tmp + '/' + folders.assets.images + '/**/*', folders.tmp + '/' + folders.assets.images + '/**/*'])
    .pipe(gulp.dest(folders.dest + '/' + folders.assets.images));
});

gulp.task('html:tmp:dist', function() {
  return gulp.src(folders.tmp + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(folders.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src([folders.src + '/*.*', folders.src + '/.*', folders.src + '/**/*.{html,shtml,php,xml,json}', '!' + folders.components + '/**/*', '!' + folders.src + '/' + folders.assets.js + '/**/*'])
    .pipe(gulp.dest(folders.dest));
});

gulp.task('dist', function(cb) {
  runSequence('clean', 'default', ['js:dist', 'vendor:dist', 'css:dist', 'fonts:dist', 'images:dist', 'pkg:dist'], 'html:src:dist', 'html:tmp:dist', cb);
});

gulp.task('dist:bump', ['bump:patch', 'dist']);



/*******************************************************************************
    DEPLOY TASK
*******************************************************************************/

gulp.task('deploy', ['dist'], function(cb) {
  rsync({
    args: ['--verbose'],
    src: './' + folders.dest + '/',
    exclude: ['.git', '.DS_Store', '.gitattributes', '.gitignore'],
    ssh: true,
    dest: config.deploy.ssh.dest,
    recursive: true,
    syncDestIgnoreExcl: true,
    dryRun: false
  }, function(err, stdout, stderr, cmd) {
    console.log('Shell command was: ' + cmd);

    if (err) {
      cb(err);
    } else {
      console.log(stdout);
      cb();
    }
  });
});



/*******************************************************************************
    PageSpeed TASK
*******************************************************************************/


// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://example.com',
  strategy: 'mobile'
}));



/*******************************************************************************
    WATCH / SERVE TASK
*******************************************************************************/

// Build and serve the output from the dist build
gulp.task('serve:dist', ['dist'], function() {
  var openBrowserWindow = !($.util.env.restart || false);

  browserSync({
    notify: false,
    open: openBrowserWindow,
    ghostMode: false,
    server: {
      baseDir: folders.dest
    }
  });
});



gulp.task('watch', function() {

  var openBrowserWindow = !($.util.env.restart || false);
  var ghostMode = !($.util.env.ghostMode || false);

  browserSync({
    notify: false,
    open: openBrowserWindow,
    ghostMode: ghostMode,

    server: {
      baseDir: [folders.tmp, folders.src]
    }
  });

  // Watch for changes in `src` folder
  gulp.watch(folders.src + '/**/*.{html,shtml,php,xml,json}', reload);

  // Watch .scss files
  gulp.watch(folders.src + '/' + folders.assets.scss + '/**/*.scss', ['scss']);

  // Watch .stylus files
  gulp.watch(folders.src + '/' + folders.assets.stylus + '/**/*.styl', ['stylus']);

  // Watch .js files
  gulp.watch([folders.src + '/' + folders.assets.js + '/**/*.js'], ['js']);

  // Watch .jade files
  gulp.watch(folders.src + '/' + folders.jade + '/**/*.jade', ['jade']);

  // Watch sprite changes
  gulp.watch(folders.src + '/' + folders.assets.sprites + '/*.{png,jpg,gif}', ['sprites', reload]);

  // Watch image files
  // gulp.watch(folders.src + '/assets/images/**/*', ['images']);
  //
  // Watch sprite changes
  gulp.watch(folders.src + '/' + folders.assets.sprites + '/*.png', ['sprites']);

});


gulp.task('default', function(cb) {
  runSequence('sprites', ['scripts', 'styles'], cb);
});

gulp.task('dev', function(cb) {
  runSequence('default', 'watch', cb);
});
