const express = require('express');
const { ObjectID } = require('mongodb');
const debug = require('debug')('library:bookRoute');
const MongoUtil = require('../persistence/utils');
const ErrorResponse = require('../models/errorResponse');

// TODO: to make it right cuz books/01 are passed correctly
// TODO: to make it OOP - e.g defining it within some class
function validateId(req) {
  const { id } = req.params;
  const parsedInt = Number.parseInt(id, 10);
  if (Number.isNaN(parsedInt)) {
    throw new ErrorResponse('Id is not an integer', 'provide a valid id for the book you are looking for', 400);
  }
  return id;
}

function getBookRoute(nav, mongoConf) {
  const bookRouter = express.Router();

  bookRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get((req, res, next) => {
      const getAllBooks = async () => {
        const bookCollection = await MongoUtil.getCollectionReference(mongoConf, 'book');
        const books = await bookCollection.find({}).toArray();
        const objToInject = {
          title: 'books',
          nav,
          books
        };
        res.render('booksView', objToInject);
      };

      getAllBooks().catch(next);
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const id = validateId(req);
      const getBookById = async () => {
        const bookCollection = await MongoUtil.getCollectionReference(mongoConf, 'book');
        const book = await bookCollection.findOne({ _id: new ObjectID(id) });
        debug(`I get a book with id = ${id} and result is book = %O`, book);
        if (!book) {
          throw new ErrorResponse('Not Found', `Book with id = ${id} not found`, 404);
        }
        req.book = book;
        next();
      };
      // to propage the error to Express registered error middleware method
      getBookById().catch(next);
    })

    .get((req, res) => {
      const { book } = req;
      res.render('bookView',
        {
          title: `${book.title}`,
          nav,
          book
        });
    })

    .delete((req, resp, next) => {
      next(new ErrorResponse('API is not yet supported', '', 501));
    })

    .post((req, resp, next) => {
      next(new ErrorResponse('API is not yet supported', '', 501));
    });

  return bookRouter;
}

module.exports = getBookRoute;
