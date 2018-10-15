const debug = require('debug')('library:authController');
const mongoDBServiceMeth = require('../services/mongoDBService');
const User = require('../models/user');

function authController(nav, mongoConf) {
  const mongoDBService = mongoDBServiceMeth(mongoConf);

  function singUp(req, res, next) {
    const signUp = async () => {
      // 1. extract user from req
      const { username, password } = req.body;
      const user = new User(username, password);

      // 2. TODO: validate user's input

      // 3. store the user in DB
      const { _id: userId } = mongoDBService.createUser(user);

      // 3. login the user manually
      req.login(userId, () => {
        res.redirect('/auth/profile');
      });
    };
    signUp().catch(next);
  }

  function getSignIn(req, res) {
    const objToInject = {
      title: 'Signin',
      nav
    };
    res.render('signin', objToInject);
  }

  function getProfile(req, res) {
    const result = {
      req_user: [req.user],
      req_body: [req.body]
    };

    res.json(result);
  }

  function profileIntersceptor(req, res, next) {
    if (req.isAuthenticated()) {
      debug('user is authenicated', req.user);
      next();
    } else {
      debug('user is not authenicated, he will be redirected to home', req.user);
      res.redirect('/');
    }
  }

  return {
    singUp,
    getSignIn,
    getProfile,
    profileIntersceptor
  };
}

module.exports = authController;
