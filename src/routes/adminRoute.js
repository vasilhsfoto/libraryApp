const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('library:adminRoute');

const books = [
  {
    id: 0,
    title: 'In Search of Lost Time',
    genre: 'Fiction',
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

function getAdminRoute(mongoConf) {
  const adminRouter = express.Router();
  adminRouter.get('/', (req, res, next) => {
    (async () => {
      let client;
      try {
        client = await MongoClient.connect(mongoConf.url);
        const db = client.db(mongoConf.dbName);

        const response = await db.collection('book').insertMany(books);
        res.json(response);
      } catch (err) {
        next(err);
      } finally {
        client.close();
      }
    })();
  });

  return adminRouter;
}

module.exports = getAdminRoute;
