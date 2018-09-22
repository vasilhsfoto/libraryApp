const express = require('express');
const sql = require('mssql');
const debug = require('debug')('library:bookRoutes');
const ErrorResponse = require('../models/errorResponse');

const GET_ALL = 'select * from Books';
const GET_BOOK_BY_ID = 'select * from Books where id = @bookId';

// TODO: to make it right cuz books/01 are passed correctly
// TODO: to make it OOP - e.g defining it within some class
function getId(req) {
  const { id } = req.params;
  const parsedInt = Number.parseInt(id, 10);
  if (Number.isNaN(parsedInt)) {
    throw new ErrorResponse('Id is not an integer', 'provide a valid id for the book you are looking for', 400);
  }
  return id;
}

function getBookRoute(nav) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get((req, res, next) => {
      const getAllBooks = async () => {
        const sqlRequest = new sql.Request();
        const { recordset: books } = await sqlRequest.query(GET_ALL);

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
      const id = getId(req);
      const getBookById = async () => {
        const sqlRequest = new sql.Request();
        const { recordset } = await sqlRequest.input('bookId', sql.Int, id)
          .query(GET_BOOK_BY_ID);
        const [book] = recordset;
        if (!book) {
          throw new ErrorResponse('Not Found', 'Book with id = xxx not found', 404);
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
