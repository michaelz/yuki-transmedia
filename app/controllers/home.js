var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      pagename: 'home',
      title: 'Yuki Transmedia',
      articles: articles
    });
  });
});


/**
 * Calligraphy route. Maybe move it somewhere else
 */
router.get('/martialArts', function (req, res, next) {
    res.render('martialArts', {
      pagename: 'martialArts',
      title: 'martialArts page'
    });
});
