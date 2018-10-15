// TODO: use utils.promisify in here
const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('library:goodreadsService');

const xmlToJsParser = new xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  async function getBookById(bookId) {
    // 1. Get the book by id from goodreads api
    const GOOD_READ_URL = `https://www.goodreads.com/book/show/${bookId}.json`;
    const result = await axios.get(GOOD_READ_URL,
      {
        params: {
          key: 'dKXs38tZJV11lUXFmLSBhA'
        }
      });

    // 2. transfer xml to json and return book
    const book = await new Promise((resolve, reject) => {
      xmlToJsParser.parseString(result.data, (err, jsonData) => {
        if (err) {
          debug(err);
          reject(err);
        } else {
          resolve(jsonData.GoodreadsResponse.book);
        }
      });
    });

    return book;
  }

  return {
    getBookById
  };
}

module.exports = goodReadsService();
