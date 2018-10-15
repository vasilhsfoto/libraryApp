const passport = require('passport');
const debug = require('debug')('library:passport');
const mongoDBServiceMeth = require('../services/mongoDBService');

function passportConfig(app, mongoConf) {
  debug('passport is initialized');
  require('./strategies/localStrategy')(mongoConf);

  const mongoDBService = mongoDBServiceMeth(mongoConf);

  app.use(passport.initialize());
  app.use(passport.session());

  // Store users in memory session - only the user id is stored in the session
  passport.serializeUser((userId, done) => {
    debug('Serializing/creating the session for userId = %o', userId);
    done(null, userId);
  });

  // Retrieve user from session and then look up the user from DB.
  passport.deserializeUser((userId, done) => {
    debug('Deserializing the user %o from the session', userId);

    (async () => {
      try {
        const loggedInUser = await mongoDBService.getUserById(userId);

        if (!loggedInUser) {
          return done(null, false);
        }
        debug('adding user %o in the req using done call', loggedInUser);
        return done(null, loggedInUser);
      } catch (err) {
        return done(err);
      }
    })();
  });
}

module.exports = passportConfig;
