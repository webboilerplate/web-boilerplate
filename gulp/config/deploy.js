var config = require('./');

module.exports = {

  src: './' + config.path.dest + '/',

  development: {
    username: 'user',
    host: '111.111.111.111',
    port: 22,
    path: '/var/www/html'
  },

  production: {
    username: 'user',
    host: '111.111.111.111',
    port: 22,
    path: '/var/www/html'
  }
};
