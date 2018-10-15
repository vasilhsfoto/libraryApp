function mainController(nav) {
  function getHome(req, res) {
    // res.sendFile(path.join(__dirname, 'views', 'index_from_bootstrap.html'));
    res.render('index',
      {
        nav
      });
  }

  return {
    getHome
  };
}

module.exports = mainController;
