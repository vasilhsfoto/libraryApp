const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('library:local-strategy');
const MongoUtil = require('../../persistence/utils');

const stategyConf = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

function configureLocalStrategy(mongoConf) {
  debug('passport is configured its local-strategy');
  passport.use(new Strategy(stategyConf,
    (req, username, password, done) => {
      (async () => {
        try {
          const userCollection = await MongoUtil.getCollectionReference(mongoConf, 'user');
          const user = await userCollection.findOne({ username });

          if (!user) {
            return done(null, false, { message: 'user account does not exist' });
          }

          if (user.password !== password) {
            return done(null, false, { message: 'password does not match' });
          }

          return done(null, user._id);
        } catch (err) {
          return done(err);
        }
      })();
    }));
}

module.exports = configureLocalStrategy;
