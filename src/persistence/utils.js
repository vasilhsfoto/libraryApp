const { MongoClient } = require('mongodb');
const debug = require('debug')('library:utils');

// TODO: where to close the connection ??
class MongoUtil {
  static async getCollectionReference(mongoConf, collectionName) {
    debug('within the static method to get reference in the collection %o. MongoConf = %o',
      collectionName, mongoConf);

    const client = await MongoClient.connect(mongoConf.url);
    const db = client.db(mongoConf.dbName);

    return await db.collection(collectionName); // eslint-disable-line no-return-await
  }
}

module.exports = MongoUtil;
