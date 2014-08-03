'use strict';

/*******************************************************************************
    DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var ip = require('ip');
var runSequence = require('run-sequence');
var pagespeed = require('psi');
var fs = require('fs');
var rsync = require('rsyncwrapper').rsync;
var pkg = require('./package.json');

var spritesmith = require('gulp.spritesmith');

var path = require('path');
var config = require('./config');
var folders = config.folders;

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''
].join('\n');



/*******************************************************************************
    Helper
*******************************************************************************/

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
  return gulp.src([
      folders.destAssets
      // path.join(folders.destAssets, config.styles.css.folder),
      // path.join(folders.destAssets, config.js.folder),
      // path.join(folders.destAssets, config.fonts.folder),
      // path.join(folders.destAssets, config.images.folder)
    ], {
      read: false
    })
    .pipe($.clean());
});


/*******************************************************************************
    CSS TASK
*******************************************************************************/


gulp.task('scss', function() {
  return gulp.src(folders.srcAssets + '/' + config.styles.scss.folder + '/' + config.styles.scss.main)
    .pipe($.plumber())
    .pipe($.sass({
      includePaths: folders.components,
      outputStyle: 'expanded'
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmpAssets + '/css'))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('compass', function() {
  return gulp.src(folders.srcAssets + '/' + config.styles.scss.folder + '/' + config.styles.scss.main)
    .pipe($.plumber())
    .pipe($.compass({
      css: folders.tmpAssets + '/' + config.styles.css.folder,
      sass: folders.srcAssets + '/' + config.styles.scss.folder,
      image: folders.srcAssets + '/' + config.images.folder,
      javascripts: folders.srcAssets + '/' + config.js.folder,
      fonts: folders.srcAssets + '/' + config.fonts.folder,
      import_path: folders.components
      //, require: ['susy', 'modular-scale']
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmpAssets + '/css'))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('stylus', function() {
  return gulp.src(folders.srcAssets + '/' + config.styles.stylus.folder + '/' + config.styles.stylus.main)
    .pipe($.plumber())
    .pipe($.stylus({
      //use: nib(),
      url: {
        name: 'embedurl',
        paths: [__dirname + '/' + folders.srcAssets + '/' + config.images.folder],
        limit: false
      },
      error: true
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmpAssets + '/css'))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('csslint', function() {
  return gulp.src(folders.tmp + '/assets/css/**/*.css')
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});


gulp.task('styles', function(cb) {
  return gulp.start(config.styles.preprocessor);
});



/*******************************************************************************
    JAVASCRIPT TASK
*******************************************************************************/

gulp.task('jshint', function() {
  return gulp.src(folders.src + 'assets/js/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter($.stylish));
});


gulp.task('js', function() {
  return gulp.src(folders.src + '/assets/js/main.js')
    .pipe($.plumber())
    .pipe($.browserify({
      insertGlobals: false,
      debug: true,
      shim: config.shim
    }))
    .on('error', handleErrors)
    .pipe($.rename('app.js'))
    .pipe(gulp.dest(folders.tmp + '/assets/js'))
    .pipe(reload({
      stream: true,
      once: true
    }));
});


gulp.task('vendor', function() {
  return gulp.src(folders.src + '/assets/js/vendor/*.js')
    .pipe(gulp.dest(folders.tmp + '/assets/js/vendor'));
});


gulp.task('scripts', function(cb) {
  return runSequence('jshint', ['js', 'vendor'], cb);
});




/*******************************************************************************
    IMAGES / SPRITE TASK
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src(folders.src + '/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(folders.src + '/assets/images'))

  .on('error', handleErrors);
});


gulp.task('sprites', function() {
  var spriteData = gulp.src(folders.src + '/assets/images/sprites/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      padding: 10,
      cssName: 'sprites.scss'
    }));

  spriteData.img.pipe(gulp.dest(folders.src + '/assets/images/'));
  spriteData.css.pipe(gulp.dest(folders.src + '/assets/scss/components/utils/'));
});


/*******************************************************************************
    TEMPLATE TASK
*******************************************************************************/


/*******************************************************************************
    SERVER TASK
*******************************************************************************/


/*******************************************************************************
    BUILD / DIST TASK
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




//TODO banner gets written in every vendor.
gulp.task('js:dist', function() {
  return gulp.src(folders.tmp + '/assets/js/**/*.js')
    .pipe($.uglify())
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/assets/js'));
});

gulp.task('css:dist', function() {
  return gulp.src(folders.tmp + '/assets/css/**/*.css')
    .pipe($.minifyCss())
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.dest + '/assets/css'));
});

gulp.task('fonts:dist', function() {
  return gulp.src(folders.src + '/assets/fonts/**/*')
    .pipe(gulp.dest(folders.dest + '/assets/fonts'));
});

gulp.task('images:dist', function() {
  return gulp.src([folders.src + '/assets/images/**/*', '!' + folders.src + '/assets/images/sprites'])
    .pipe(gulp.dest(folders.dest + '/assets/images'));
});

gulp.task('html:tmp:dist', function() {
  return gulp.src(folders.tmp + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(folders.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src([folders.src + '/*.*', folders.src + '/**/*.{html,shtml,php,xml,json}', '!' + folders.bower + '/**/*', '!' + folders.srcAssets + '/js/**/*'])
    .pipe(gulp.dest(folders.dest));
});

gulp.task('dist', function(cb) {
  runSequence('clean', 'default', ['js:dist', 'css:dist', 'fonts:dist', 'images:dist'], 'html:src:dist', 'html:tmp:dist', cb);
});

gulp.task('dist:bump', ['bump:patch', 'dist']);



/*******************************************************************************
    DEPLOY TASK
*******************************************************************************/

gulp.task('deploy', ['dist'], function(cb) {
  rsync({
    args: ['--verbose'],
    src: './dist/',
    exclude: ['.git', '.DS_Store', '.gitattributes', '.gitignore'],
    ssh: true,
    dest: config.rsync.dest,
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
  browserSync({
    notify: false,
    server: {
      baseDir: folders.dest
    }
  });
});



gulp.task('watch', function() {

  var openBrowserWindow = !($.util.env.restart || false);

  browserSync({
    notify: false,
    open: openBrowserWindow,
    server: {
      baseDir: ['.tmp', 'src']
    }
  });

  // Watch for changes in `app` folder
  gulp.watch([folders.src + '/**/*.{html,shtml,php,xml,json}'], reload);

  // Watch .scss files
  gulp.watch(folders.src + '/assets/scss/**/*.scss', ['scss']);

  // Watch .stylus files
  gulp.watch(folders.src + '/assets/stylus/**/*.styl', ['stylus']);

  // Watch .css files
  //gulp.watch(['{.tmp,app}/assets/css/**/*.css'], ['autoprefixer', reload]);

  // Watch .js files
  gulp.watch([folders.src + '/assets/js/**/*.js'], ['js']);

  // Watch .jade files
  gulp.watch(folders.src + '/jade/**/*.jade', ['jade']);

  // Watch image files
  // gulp.watch(folders.src + '/assets/images/**/*', ['images']);

});


gulp.task('default', function() {
  gulp.start('scripts', 'images', 'styles');
});

gulp.task('dev', ['default', 'watch']);
