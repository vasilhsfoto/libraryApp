const mongoDBServiceMeth = require('../services/mongoDBService');

function adminController(mongoConf) {
  const mongoDBService = mongoDBServiceMeth(mongoConf);

  /**
   * When user is authenticated, he can GET /admin to have some pre-defined list of books created,
   * i.e inserted into mongoDB
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  function getAdmin(req, res, next) {
    (async () => {
      try {
        const response = await mongoDBService.createBooks();
        res.json(response);
      } catch (err) {
        next(err);
      }
    })();
  }

  return {
    getAdmin
  };
}

module.exports = adminController;
