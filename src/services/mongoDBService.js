// TODO : close the connection ??
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('library:mongoDBService');

const initialBooks = [
  {
    id: '12749',
    title: 'In Search of Lost Time',
    genre: 'Fiction',
    author: 'Marcel Proust',
    read: false
  },
  {
    id: '3836',
    title: 'Don Quixote',
    genre: '',
    author: 'Miguel de Cervantes',
    read: false
  },
  {
    id: '338798',
    title: 'Ulysses',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'James Joyce',
    read: false
  },
  {
    id: '4671',
    title: 'The Great Gatsby',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'F. Scott Fitzgerald',
    read: false
  },
  {
    id: '153747',
    title: 'Moby Dick',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Herman Melville',
    read: false
  },
  {
    id: '1420',
    title: 'Hamlet',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'William Shakespeare',
    read: false
  },
  {
    id: '656',
    title: 'War and Peace',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Leo Tolstoy',
    read: false
  },
  {
    id: '1381',
    title: 'The Odyssey',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Leoby Homer',
    read: false
  },
  {
    id: '320',
    title: 'One Hundred Years of Solitude',
    genre: 'Anim aliquip consectetur duis consectetur nostrud cupidatat ipsum sit.',
    author: 'Gabriel Garcia Marquez',
    read: false
  }
];

async function getCollectionReference(mongoConf, collectionName) {
  debug('within the static method to get reference on the collection %o', collectionName);

  const client = await MongoClient.connect(mongoConf.url);
  const db = client.db(mongoConf.dbName);

  return await db.collection(collectionName); // eslint-disable-line no-return-await
}

function mongoDBService(mongoConf) {
  async function getBookById(bookId) {
    const bookCollection = await getCollectionReference(mongoConf, 'book');
    const book = await bookCollection.findOne({ _id: new ObjectID(bookId) });

    return book;
  }

  async function getBooks() {
    const bookCollection = await getCollectionReference(mongoConf, 'book');
    const books = await bookCollection.find({}).toArray();

    return books;
  }

  async function createBooks() {
    const bookCollection = await getCollectionReference(mongoConf, 'book');
    const response = await bookCollection.insertMany(initialBooks);

    return response;
  }

  async function createUser(user) {
    const userCollection = await getCollectionReference(mongoConf, 'user');
    const results = await userCollection.insertOne(user);

    return results.ops[0];
  }

  async function getUserById(userId) {
    const userCollection = await getCollectionReference(mongoConf, 'user');
    const loggedInUser = await userCollection.findOne({ _id: new ObjectID(userId) });
    return loggedInUser;
  }

  async function getUserByUsername(username) {
    const userCollection = await getCollectionReference(mongoConf, 'user');
    const user = await userCollection.findOne({ username });
    return user;
  }

  return {
    getBookById,
    getBooks,
    createBooks,
    getUserById,
    getUserByUsername,
    createUser
  };
}

module.exports = mongoDBService;
