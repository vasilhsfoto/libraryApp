const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('library:local-strategy');
const mongoDBServiceMeth = require('../../services/mongoDBService');

const stategyConf = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

function configureLocalStrategy(mongoConf) {
  debug('passport is configured its local-strategy');
  const mongoDBService = mongoDBServiceMeth(mongoConf);

  passport.use(new Strategy(stategyConf,
    (req, username, password, done) => {
      (async () => {
        try {
          debug('local strategy will run authentication logic');
          const user = await mongoDBService.getUserByUsername(username);
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
