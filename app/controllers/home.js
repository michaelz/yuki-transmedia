var express = require('express'),
    router = express.Router(),
    config = require('../../config/config'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    auth = require('../services/auth'),
    Article = mongoose.model('Article');

module.exports = function(app) {
    app.use('/', router);
};

/*
 * MongoDBStore session
 */
var store = new MongoDBStore({
    uri: config.db,
    collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});

router.use(session({
    secret: 'keyboard cat',
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: false
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))

router.get('/', /*auth.mustBeAuthenticated,*/ function(req, res, next) {
    var sess = req.session;
    if (sess.views) {
        sess.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000 / 60 /
                60 / 24) +
            'days</p>')
        res.end()
    } else {
        sess.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});


/**
 * Map Route
 */
router.get('/map', function(req, res, next) {
    res.render('map', {
        pagename: 'map',
        title: 'Map'
    });
});

/**
 * Introduction route.
 */
router.get('/introduction', function(req, res, next) {
    res.render('introduction', {
        pagename: 'introduction',
        title: 'introduction page'
    });
});

/**
 * login route.
 */
router.get('/login', function(req, res, next) {
    res.render('login', {
        pagename: 'login',
        title: 'login page'
    });
});

/**
 * MartialArts route.
 */
router.get('/martialArts', function(req, res, next) {
    res.render('martialArts', {
        pagename: 'martialarts',
        title: 'martialArts page'
    });
});

/**
 * Calligraphy route.
 */
router.get('/calligraphy', function(req, res, next) {
    res.render('calligraphy', {
        pagename: 'calligraphy',
        title: 'Calligraphy page'
    });
});


/**
 * Calligraphy route.
 */
router.get('/food', function(req, res, next) {
    res.render('food', {
        pagename: 'food',
        title: 'food Quizz page'
    });
});

/**
 * Calligraphy route.
 */
router.get('/origami', function(req, res, next) {
    res.render('origami', {
        pagename: 'origami',
        title: 'origami page'
    });
});

/**
 * Pop culture route.
 */
router.get('/popculture', function(req, res, next) {
    res.render('popculture', {
        pagename: 'popculture',
        title: 'popculture page'
    });
});



/**
 * Outro route.
 */
router.get('/outro', function(req, res, next) {
    res.render('outro', {
        pagename: 'outro',
        title: 'outro page'
    });
});
