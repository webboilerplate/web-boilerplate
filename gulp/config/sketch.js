'use strict';

var config = require('./');

module.exports = {
  watch: config.path.src + '/' + config.path.sketch + '/**/*.sketch',
  src: config.path.src + '/' + config.path.sketch + '/**/*.sketch',
  dest: config.path.build + '/' + config.path.iconfont,
  settings: {
    export: 'artboards', //pages,artboards,slices
    formats: 'svg', // png,jpg,pdf,eps,svg
    clean: true

    // scales : 1.0 // 1.0,2.0
    //items: List of artboard/slice names or ids to export. The default is to export all artboards/slices (optional).
    //bounds:
    //saveForWeb: Export web-ready images (optional, defaults to NO).
    //compact: Export in compact form. Currently only relevant for SVG export. (optional, defaults to NO).
    //trimmed: Export images trimmed. (optional, defaults to NO).

  }
};
