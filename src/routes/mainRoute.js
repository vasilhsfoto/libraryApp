const express = require('express');

function getMainRoute(nav) {
  const mainRoute = express.Router();

  mainRoute.route('/')
    .get((req, res) => {
      // res.sendFile(path.join(__dirname, 'views', 'index_from_bootstrap.html'));
      res.render('index',
        {
          nav
        });
    });
  return mainRoute;
}

module.exports = getMainRoute;
