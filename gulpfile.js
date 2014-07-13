'use strict';

/*******************************************************************************
    DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var handleErrors = require('./gulp/util/handleErrors');
var reload = browserSync.reload;
var rsync = require('rsyncwrapper').rsync;



//TODO read file on the fly
//JSON.parse(fs.readFileSync("package.json", "utf8"));
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' */',
    ''
].join('\n');

//watch = require('gulp-watch');


/*******************************************************************************
    Helper
*******************************************************************************/

function getIPAddress(ipVersion) {
    ipVersion = ipVersion || 'IPv4';
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === ipVersion && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }

    return '0.0.0.0';
}



/*******************************************************************************
    FILE / PATH / SHIM  CONFIG
*******************************************************************************/

var folders = {
    src: 'app',
    dest: 'dist',
    bower: 'app/assets/components',
    tmp: '.tmp',
    componentsPath: 'app/assets/components'
};


var config = {
    shim: {
        // picturePolyfill: {
        //     path: folders.bower + '/picturePolyfill/src/picturePolyfill.js',
        //     exports: 'picturePolyfill'
        // }
    },
    server: {
        app: {
            host: getIPAddress(),
            port: 9000,
            protocol: 'http://'
        },
        dist: {
            host: getIPAddress(),
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
    }
};

try {
    var c = require('./deploy-config')();
    for (var i in c) {
        config[i] = c[i];
    }
} catch (e) {
    console.warn('you should implement a deploy-config.js with rsync information!');
}





/*******************************************************************************
    CLEAN DEST TASK
*******************************************************************************/
gulp.task('clean', function() {
    return gulp.src([folders.dest + '/assets/css', folders.dest + '/assets/js', folders.dest + '/assets/fonts', folders.dest + '/assets/images'], {
            read: false
        })
        .pipe($.clean());
});


/*******************************************************************************
    CSS TASK
*******************************************************************************/



gulp.task('styles:sass', function() {
    return gulp.src(folders.src + '/assets/scss/style.scss', {
            read: false
        })
        .pipe($.plumber())
        .pipe($.sass({
            includePaths: folders.sassIncludePaths,
            outputStyle: 'expanded'
        }))
        .pipe($.autoprefixer(config.autoprefixer.def))
        .pipe(gulp.dest(folders.tmp + '/assets/css'));
});


gulp.task('styles:compass', function() {
    return gulp.src(folders.src + '/assets/scss/*.{scss,sass}')
        .pipe($.plumber())
        .pipe($.compass({
            // css: folders.src + '/assets/css',
            css: folders.tmp + '/assets/css',
            sass: folders.src + '/assets/scss',
            image: folders.src + '/assets/images',
            javascripts: folders.src + '/assets/js',
            fonts: folders.src + '/assets/fonts',
            import_path: folders.sassIncludePaths
                /*,
                require: ['susy', 'modular-scale']*/
        }))
        .on('error', handleErrors)
        .pipe($.autoprefixer(config.autoprefixer.def))
        .pipe(gulp.dest(folders.tmp + '/assets/css'));
});



gulp.task('styles:stylus', function() {
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
gulp.task('styles:css', function() {
    return gulp.src(folders.tmp + '/assets/css/**/*.css')
        .pipe($.changed(folders.tmp + '/assets/css/'))
        .pipe($.autoprefixer.apply(config.autoprefixer.def))
        .pipe(gulp.dest(folders.tmp + '/assets/css'));
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
    gulp.src('./package.json')
        .pipe($.bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function() {
    gulp.src('./package.json')
        .pipe($.bump({
            type: 'minor'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function() {
    gulp.src('./package.json')
        .pipe($.bump({
            type: 'major'
        }))
        .pipe(gulp.dest('./'));
});



gulp.task('default', function() {
    gulp.start('jshint', 'js', 'stylus', 'images');
});




var dist = function() {

    gulp.src(folders.tmp + '/assets/js/app.js')
        .pipe($.uglify())
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(folders.dest + '/assets/js'));

    gulp.src(folders.tmp + '/assets/css/**/*.css')
        .pipe($.minifyCss())
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(folders.dest + '/assets/css'));

    // gulp.src(folders.src + '/assets/images')
    //     .pipe(gulp.dest(folders.dest + '/assets/images'));

    gulp.src(folders.src + '/assets/fonts/**/*')
        .pipe(gulp.dest(folders.dest + '/assets/fonts'));

    gulp.src(folders.src + '/iGraphics/**/*')
        .pipe(gulp.dest(folders.dest + '/iGraphics'));

    gulp.src(folders.tmp + '/**/*.{html,shtml,php,xml,json}')
        .pipe(gulp.dest(folders.dest));

    gulp.src([folders.src + '/**/*.{html,shtml,php,xml,json}', '!' + folders.bower + '/**/*'])
        .pipe(gulp.dest(folders.dest))
        .pipe($.size());
    // .pipe(notify('Build successfull'));
};




gulp.task('dist', ['clean', 'default'], dist);
gulp.task('dist:bump', ['clean', 'bump:patch', 'default'], dist);



/*******************************************************************************
    DEPLOY TASK
*******************************************************************************/

gulp.task('deploy', [], function(callback) {
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
            callback(err);
        } else {
            console.log(stdout);
            callback();
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
    gulp.watch(folders.src + '/assets/scss/**/*.scss', ['styles:sass']);

    // Watch .stylus files
    gulp.watch(folders.src + '/assets/stylus/**/*.styl', ['styles:stylus', reload]);

    // Watch .css files
    //gulp.watch(['{.tmp,app}/assets/css/**/*.css'], ['styles:css', reload]);

    // Watch .js files
    gulp.watch([folders.src + '/assets/js/**/*.js'], ['js']);

    // Watch .jade files
    gulp.watch(folders.src + '/jade/**/*.jade', ['jade']);

    // Watch image files
    // gulp.watch(folders.src + '/assets/images/**/*', ['images']);

});
