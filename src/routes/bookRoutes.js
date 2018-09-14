const express = require('express');

const bookRouter = express.Router();

/**
 * Book Router definition
 */
function router(nav) {
  const books = [
    {
      id: 0,
      title: 'In Search of Lost Time',
      genre: '',
      author: 'Marcel Proust',
      read: false
    },
    {
      id: 1,
      title: 'Don Quixote',
      genre: '',
      author: 'Miguel de Cervantes',
      read: false
    },
    {
      id: 2,
      title: 'Ulysses',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'James Joyce',
      read: false
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'F. Scott Fitzgerald',
      read: false
    },
    {
      id: 4,
      title: 'Moby Dick',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'Herman Melville',
      read: false
    },
    {
      id: 5,
      title: 'Hamlet',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'William Shakespeare',
      read: false
    },
    {
      id: 6,
      title: 'War and Peace',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'Leo Tolstoy',
      read: false
    },
    {
      id: 7,
      title: 'The Odyssey',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'Leoby Homer',
      read: false
    },
    {
      id: 8,
      title: 'One Hundred Years of Solitude',
      genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
      author: 'Gabriel Garcia Marquez',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => res.render('bookListView',
      {
        books,
        title: 'books',
        nav
      }));

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      // 1. query the D.B to get book by id
      const book = books[id];
      // 2. populate the view with dynamic data
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book
        }
      );
    });

  return bookRouter;
}

module.exports = router;
