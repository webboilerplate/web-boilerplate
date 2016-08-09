var config = require('./');
var sass = require('./sass');
var stylus = require('./stylus');

module.exports = config.preprocessor === 'sass' ? sass : stylus;
