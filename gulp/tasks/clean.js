'use strict';

var gulp = require('gulp');
var del = require('del');
var paths = require('../config').paths;

/*******************************************************************************
    CLEAN DEST TASK
*******************************************************************************/

// delete the dist folder but everything git and Readme or package.json
gulp.task('clean', del.bind(null, [paths.dest + '/**/*', '!' + paths.dest + '.git*', '!' + paths.dest + 'README.md', '!' + paths.dest + 'package.json']));
