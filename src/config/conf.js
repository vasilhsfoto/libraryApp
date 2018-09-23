/**
 * Getting Connection From D.B
 */
const config = {
  nav: [
    {
      title: 'Books',
      link: 'books'
    },
    {
      title: 'Authors',
      link: 'authors'
    }],
  development: {
    mongo: {
      url: 'mongodb://127.0.0.1:27017',
      dbName: 'library'
    },
    msql: {
      user: 'library',
      password: 'xxx',
      server: 'pslibrarydemo.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
      database: 'PSLibrary',

      options: {
        encrypt: true // Use this if you're on Windows Azure
      }
    }
  },
  production: {
  }
};

module.exports = config;
