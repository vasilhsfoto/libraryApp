const express = require('express');
const passport = require('passport');
const authControllerMeth = require('../controllers/authController');

function getAuthRouter(nav, mongoConf) {
  const authRouter = express.Router();
  const authControllerService = authControllerMeth(nav, mongoConf);

  authRouter.route('/signUp')
    .post(authControllerService.singUp);

  authRouter.route('/signin')
    .get(authControllerService.getSignIn)
    .post(passport.authenticate('local',
      {
        successRedirect: '/books',
        failureRedirect: '/',
        session: true
      }));

  authRouter.route('/profile')
    .all(authControllerService.profileIntersceptor)
    .get(authControllerService.getProfile);

  return authRouter;
}

module.exports = getAuthRouter;
