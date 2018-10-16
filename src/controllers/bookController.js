// TODO: when one rest call to goodService fails, we should not fail
const debug = require('debug')('library:bookController');
const ErrorResponse = require('../models/errorResponse');
const bookService = require('../services/goodReadsService');
const mongoDBServiceMeth = require('../services/mongoDBService');

function bookController(nav, mongoConf) {
  const mongoDBService = mongoDBServiceMeth(mongoConf);

  function extractBook(req, res, next) {
    const { id: bookId } = req.params;
    async function getBookByIdAsync() {
      const book = await mongoDBService.getBookById(bookId);
      debug(`I get a book with id = ${bookId} and result is book = %O`, book);

      if (!book) {
        throw new ErrorResponse('Not Found', `Book with id = ${bookId} not found`, 404);
      }

      const goodReadBook = await bookService.getBookById(book.id);
      book.details = goodReadBook;

      req.book = book;
      next();
    }
    // to propagate the error to Express registered error middleware method
    getBookByIdAsync().catch(next);
  }

  function getBooks(req, res, next) {
    const getBooksAsyn = async () => {
      // 1. Get books from my storage - MongoDB
      const books = await mongoDBService.getBooks();

      // 2. Get additional details from goodBooks api

      // array of books to id -> book
      const goodReadIdToBook = new Map(books.map(book => [book.id, book]));

      const promises = [];
      for (const book of books) {
        promises.push(bookService.getBookById(book.id));
      }

      // TODO: not to fail if one GET /goodreads rest calls fails...
      Promise.all(promises)
        .then((goodReadBooks) => {
          for (const goodReadBook of goodReadBooks) {
            const book = goodReadIdToBook.get(goodReadBook.id);
            book.details = goodReadBook;
          }

          const objToInject = {
            title: 'books',
            nav,
            books
          };

          res.render('booksView', objToInject);
        });
    };

    getBooksAsyn().catch(next);
  }

  function getBookById(req, res) {
    const { book } = req;
    res.render('bookView',
      {
        title: `${book.title}`,
        nav,
        book
      });
  }

  function deleteBookById(req, res) {
    // if in the same tick - all the errors are propagated to the first
    // error method middleware. you don't need to do next(error);
    // throw new ErrorResponse('API is not yet supported', '', 501);
    throw new ErrorResponse('API is not yet supported', '', 501);
  }

  function createBook(req, res, next) {
    next(new ErrorResponse('API is not yet supported', '', 501));
  }

  return {
    getBooks,
    extractBook,
    getBookById,
    createBook,
    deleteBookById
  };
}

module.exports = bookController;
