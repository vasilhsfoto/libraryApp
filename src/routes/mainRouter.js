const express = require('express');
const mainController = require('../controllers/mainController');

function getMainRouter(nav) {
  const mainControllerService = mainController(nav);

  const mainRouter = express.Router();

  mainRouter.route('/')
    .get(mainControllerService.getHome);

  return mainRouter;
}

module.exports = getMainRouter;
