const express = require('express');
const debug = require('debug')('library:test');

function getTestRouter() {
  const testRouter = express.Router();

  testRouter.route('/')
    .get((req, res) => {
      debug('serving GET for test route');
      const result = {
        req_user: [req.user],
        req_body: [req.body]
      };
      debug('sending result of the test route');
      res.json(result);
    });

  return testRouter;
}

module.exports = getTestRouter;
