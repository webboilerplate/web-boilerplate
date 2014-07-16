'use strict';

/*******************************************************************************
    DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var ip = require('ip');
var pagespeed = require('psi');
var handleErrors = require('./gulp/util/handleErrors');
var fs = require('fs');
var rsync = require('rsyncwrapper').rsync;
var pkg = require('./package.json');
var reload = browserSync.reload;

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

/*******************************************************************************
    FILE / PATH / SHIM  CONFIG
*******************************************************************************/


/*******************************************************************************
    CLEAN DEST TASK
*******************************************************************************/
gulp.task('clean', function() {
  return gulp.src([
      folders.dest + '/assets/css', folders.dest + '/assets/js',
      folders.dest + '/assets/fonts', folders.dest + '/assets/images'
    ], {
      read: false
    })
    .pipe($.clean());
});


/*******************************************************************************
    CSS TASK
*******************************************************************************/



gulp.task('scss', function() {
  return gulp.src(folders.src + '/assets/scss/main.scss')
    .pipe($.plumber())
    .pipe($.sass({
      includePaths: folders.sassIncludePaths,
      outputStyle: 'expanded'
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/assets/css'));
});


gulp.task('compass', function() {
  return gulp.src(folders.src + '/assets/scss/*.{scss,sass}')
    .pipe($.plumber())
    .pipe($.compass({
      // css: folders.src + '/assets/css',
      css: folders.tmp + '/assets/css',
      sass: folders.src + '/assets/scss',
      image: folders.src + '/assets/images',
      javascripts: folders.src + '/assets/js',
      fonts: folders.src + '/assets/fonts',
      import_path: folders.componentsPath
        /*,
        require: ['susy', 'modular-scale']*/
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/assets/css'));
});



gulp.task('stylus', function() {
  return gulp.src(folders.src + '/assets/stylus/main.styl')
    .pipe($.plumber())
    .pipe($.stylus({
      //use: nib(),
      url: {
        name: 'embedurl',
        paths: [__dirname + '/app/assets/images'],
        limit: false
      },
      error: true
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/assets/css'));
  // .pipe(browserSync.reload({
  //     stream: true
  // }));
});




// Automatically Prefix CSS
gulp.task('autoprefixer', function() {
  return gulp.src(folders.tmp + '/assets/css/**/*.css')
    .pipe($.changed(folders.tmp + '/assets/css/'))
    .pipe($.autoprefixer.apply(config.autoprefixer.def))
    .pipe(gulp.dest(folders.tmp + '/assets/css'));
});


gulp.task('csslint', function() {
  return gulp.src(folders.tmp + '/assets/css/**/*.css')
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});


gulp.task('styles', function(cb) {
  return gulp.start(config.css.preprocessor);
  // return runSequence('process-css', ['sass', 'compass'], 'stylus', cb);
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
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(folders.tmp + '/assets/js'))
    .pipe(reload({
      stream: true,
      once: true
    }));
});


gulp.task('modernizr', function() {
  return gulp.src(folders.src + '/assets/js/vendor/*.js')
    .pipe(gulp.dest(folders.tmp + '/assets/js/vendor'));
});



gulp.task('scripts', function(cb) {
  return runSequence('jshint', ['js', 'modernizr'], cb);
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



/*******************************************************************************
    TEMPLATE TASK
*******************************************************************************/


/*******************************************************************************
    SERVER TASK
*******************************************************************************/


/*******************************************************************************
    BUILD TASK
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






//DIST


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

//TODO vereinfachen:
gulp.task('html:root:dist', function() {
  return gulp.src([folders.src + '/*.*', '!' + folders.bower + '/**/*'])
    .pipe(gulp.dest(folders.dest));
});

gulp.task('html:tmp:dist', function() {
  return gulp.src(folders.tmp + '/**/*.{html,shtml,php,xml,json,webapp,txt,ico}')
    .pipe(gulp.dest(folders.dest));
});

gulp.task('html:src:dist', function() {
  return gulp.src([folders.src + '/**/*.{html,shtml,php,xml,json}', '!' + folders.bower + '/**/*'])
    .pipe(gulp.dest(folders.dest));
});



gulp.task('dist', function(cb) {
  runSequence('clean', 'default', ['js:dist', 'css:dist', 'fonts:dist', 'html:root:dist', 'html:tmp:dist', 'html:src:dist'], cb);
});


gulp.task('dist:bump', ['bump:patch', 'dist']);



/*******************************************************************************
    DEPLOY TASK
*******************************************************************************/

gulp.task('deploy', ['dist:bump'], function(cb) {
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



// Build and serve the output from the dist build
gulp.task('serve:dist', ['dist'], function() {
  browserSync({
    notify: false,
    server: {
      baseDir: folders.dest
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
    WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  // Watch for changes in `app` folder
  gulp.watch([folders.src + '/**/*.{html,shtml,php,xml,json}'], reload);

  // Watch .scss files
  gulp.watch(folders.src + '/assets/scss/**/*.scss', ['scss', reload]);

  // Watch .stylus files
  gulp.watch(folders.src + '/assets/stylus/**/*.styl', ['stylus', reload]);

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
  gulp.start('scripts', 'styles', 'images');
});
