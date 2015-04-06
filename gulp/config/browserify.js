var config = require('./');
var path = require('path');

module.exports = {
  // Enable source maps
  // A separate bundle will be generated for each
  // bundle config in the list below
  bundleConfigs: [{
    entries: './' + path.join(config.path.src, config.path.js, 'main.js'),
    dest: path.join(config.path.build, config.path.js),
    outputName: 'app.js',
    // Additional file extentions to make optional
    // extensions: ['.coffee', '.hbs'],
    // list of modules to make require-able externally
    // require: ['jquery', 'backbone/node_modules/underscore'],
    // See https://github.com/greypants/gulp-starter/issues/87 for note about
    // why this is 'backbone/node_modules/underscore' and not 'underscore'
  }, {
    entries: './' + path.join(config.path.src, config.path.js, 'head.js'),
    dest: path.join(config.path.build, config.path.js),
    outputName: 'head.js',
    // list of externally available modules to exclude from the bundle
    // external: ['jquery', 'underscore']
  }]
};
