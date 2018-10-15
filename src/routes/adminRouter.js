const express = require('express');
const adminControllerMeth = require('../controllers/adminController');
const filter = require('../services/filter');

function getAdminRouter(mongoConf) {
  const adminControllerService = adminControllerMeth(mongoConf);
  const adminRouter = express.Router();

  adminRouter.use(filter.authenticationFilter);

  adminRouter.route('/')
    .get(adminControllerService.getAdmin);

  return adminRouter;
}

module.exports = getAdminRouter;
