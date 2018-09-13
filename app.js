const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('myapplication');
const morgan = require('morgan');
const path = require('path');
const bookRoute = require('./src/routes/bookRoutes');
// const bookRouter = require(path.join(__dirname, 'src', 'routes', 'bookRoute.js'));

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
 * Main router
 */
const mainRouter = express.Router();
mainRouter.route('/')
  .get((req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index_from_bootstrap.html'));
    res.render('index',
      {
        nav: [{
          title: 'Books',
          link: 'books'
        },
        {
          title: 'Authors',
          link: 'authors'
        }]
      });
  });

app.use('/', mainRouter);
app.use('/books', bookRoute);

/*
Restfull End points
*/
app.get('/employees', (req, res) => {
  res.send(`list of employees [${process.env.employee1}, ${process.env.employee2}]...`);
});

/**
 * Starting server
 */
app.listen(PORT, () => debug((`listening to port ${chalk.green(PORT)}`)));
