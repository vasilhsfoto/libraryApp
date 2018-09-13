const express = require('express');
// const debug = require('debug')('myapplication-bookRouter');

const bookRouter = express.Router();

/**
 * Book Router definition
 */

const books = [
  {
    title: 'In Search of Lost Time',
    genre: '',
    author: 'Marcel Proust',
    read: false
  },
  {
    title: 'Don Quixote',
    genre: '',
    author: 'Miguel de Cervantes',
    read: false
  },
  {
    title: 'Ulysses',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'James Joyce',
    read: false
  },
  {
    title: 'The Great Gatsby',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'F. Scott Fitzgerald',
    read: false
  },
  {
    title: 'Moby Dick',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Herman Melville',
    read: false
  },
  {
    title: 'Hamlet',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'William Shakespeare',
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Leo Tolstoy',
    read: false
  },
  {
    title: 'The Odyssey',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Leoby Homer',
    read: false
  },
  {
    title: 'One Hundred Years of Solitude',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Gabriel Garcia Marquez',
    read: false
  }
];

bookRouter.route('/')
  .get((req, res) => res.render('books',
    {
      books,
      title: 'books',
      nav: [
        {
          title: 'Books',
          link: 'books'
        },
        {
          title: 'Authors',
          link: 'authors'
        }]
    }));

bookRouter.route('/single')
  .get((req, res) => {
    res.send(`Hello single book by ${process.env.employee1}`);
  });

module.exports = bookRouter;
