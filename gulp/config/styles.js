var config = require('./');

var preprocessor = process.env.PREPROCESSOR || config.preprocessor;

module.exports = preprocessor === 'sass' ? require('./sass') : require('./stylus');
