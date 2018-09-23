const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('library');
const morgan = require('morgan');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
debug(`Server started with env = ${env}`);

// My imports
const conf = require('./src/config/conf');
const ErrorResponse = require('./src/models/errorResponse');
const mainRoute = require('./src/routes/mainRoute')(conf.nav);
const bookRoute = require('./src/routes/bookRoute')(conf.nav, conf[env].mongo);
const adminRoute = require('./src/routes/adminRoute')(conf[env].mongo);

/**
 * Application instance
 */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Setting Application to use Template engine
 */
app.set('views', './src/views').set('view engine', 'ejs');

/**
 * configuring server to serve static content
 */
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));

/**
 * configuring the routes
 */
app.use('/', mainRoute);
app.use('/books', bookRoute);
app.use('/admin', adminRoute);

/**
 * Configuring custom error handlers - Note: must be used at the very end
 */

/* eslint-disable no-param-reassign */
const errorHandlerDefault = (err, req, res, next) => {
  if (!err.httpStatusCode) {
    err = new ErrorResponse('Internal Server Error', err.message, 500);
  }
  debug('my errorHandler handles the error %O', err);

  res.status(err.httpStatusCode).json(err);
};

app.use(errorHandlerDefault);

/**
 * Starting server
 */
app.listen(PORT, () => debug((`listening to port ${chalk.green(PORT)}`)));
