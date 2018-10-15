function filter() {
  function authenticationFilter(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    authenticationFilter
  };
}

module.exports = filter();
