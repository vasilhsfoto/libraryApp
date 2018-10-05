const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const MongoUtil = require('../persistence/utils');

function getAuthRoute(nav, mongoConf) {
  const authRouter = express.Router();

  authRouter.route('/signUp')
    .post((req, res, next) => {
      const signUp = async () => {
        // 1. extract user from req
        const { username, password } = req.body;
        const userRep = new User(username, password);

        // 2. validate user's input
        // TODO:

        // 3. store the user in DB
        const userCollection = await MongoUtil.getCollectionReference(mongoConf, 'user');
        const results = await userCollection.insertOne(userRep);
        const { _id: userId } = results.ops[0];

        // 3. login the user manually
        req.login(userId, () => {
          res.redirect('/auth/profile');
        });
      };
      signUp().catch(next);
    });

  authRouter.route('/signin')
    .get((req, res) => {
      const objToInject = {
        title: 'Signin',
        nav
      };
      res.render('signin', objToInject);
    })
    .post(passport.authenticate('local',
      {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
        session: true
      }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      const result = {
        req_user: [req.user],
        req_body: [req.body]
      };

      res.json(result);
    });

  return authRouter;
}

module.exports = getAuthRoute;
