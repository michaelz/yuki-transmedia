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
 * Map Route
 */
router.get('/map', function (req, res, next) {
    res.render('map', {
        pagename: 'map',
        title: 'Map'
    });
});

/**
 * Introduction route.
 */
router.get('/introduction', function (req, res, next) {
    res.render('introduction', {
      pagename: 'introduction',
      title: 'introduction page'
    });
});

/**
 * login route.
 */
router.get('/login', function (req, res, next) {
    res.render('login', {
      pagename: 'login',
      title: 'login page'
    });
});

/**
 * MartialArts route.
 */
router.get('/martialArts', function (req, res, next) {
    res.render('martialArts', {
      pagename: 'martialarts',
      title: 'martialArts page'
    });
});

/**
 * Calligraphy route.
 */
router.get('/calligraphy', function (req, res, next) {
    res.render('calligraphy', {
      pagename: 'calligraphy',
      title: 'Calligraphy page'
    });
});


/**
 * Calligraphy route.
 */
router.get('/food', function (req, res, next) {
    res.render('food', {
      pagename: 'food',
      title: 'food Quizz page'
    });
});

/**
 * Calligraphy route.
 */
router.get('/origami', function (req, res, next) {
    res.render('origami', {
      pagename: 'origami',
      title: 'origami page'
    });
});

/**
 * Pop culture route.
 */
router.get('/popculture', function (req, res, next) {
    res.render('popculture', {
      pagename: 'popculture',
      title: 'popculture page'
    });
});


/**
 * Outro route.
 */
router.get('/outro', function (req, res, next) {
    res.render('outro', {
      pagename: 'outro',
      title: 'outro page'
    });
});


