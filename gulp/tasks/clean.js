'use strict';

var gulp = require('gulp');
var del = require('del');
var folders = require('../config').folders;

/*******************************************************************************
    CLEAN DEST TASK
*******************************************************************************/

// delete the dist folder but everything git and Readme or package.json
gulp.task('clean', del.bind(null, [folders.dest + '/**/*', '!' + folders.dest + '.git*', '!' + folders.dest + 'README.md', '!' + folders.dest + 'package.json']));
