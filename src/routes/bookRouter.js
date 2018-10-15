const express = require('express');
const debug = require('debug')('library:bookRoute');
const bookController = require('../controllers/bookController');
const filter = require('../services/filter');

function getBookRouter(nav, mongoConf) {
  const bookRouter = express.Router();
  const bookControllerService = bookController(nav, mongoConf);

  bookRouter.use(filter.authenticationFilter);

  bookRouter.route('/')
    .get(bookControllerService.getBooks);

  bookRouter.route('/:id')
    .all(bookControllerService.extractBook)
    .get(bookControllerService.getBookById)
    .post(bookControllerService.createBook)
    .delete(bookControllerService.deleteBookById);

  return bookRouter;
}

module.exports = getBookRouter;
