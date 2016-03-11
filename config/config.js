var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yuki-transmedia'
    },
    port: 3000,
    db: 'mongodb://localhost/yuki-transmedia-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yuki-transmedia'
    },
    port: 3000,
    db: 'mongodb://localhost/yuki-transmedia-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yuki-transmedia'
    },
    port: 3000,
    db: 'mongodb://localhost/yuki-transmedia-production'
  }
};

module.exports = config[env];
