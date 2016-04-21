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
    secret: config.key,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: false
    },
    store: store,
    resave: true,
    saveUninitialized: true
}))


/**
 * Home page, to show the user data
 */
router.get('/', auth.mustBeAuthenticated, auth.getUserInfo, function(req, res,
    next) {
    res.render('index', {
        pagename: 'index',
        title: 'index',
        userdata: req.connectedUser // thanks auth.getUserInfo
    });
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
router.get('/login', auth.cantBeAuthenticated, function(req, res, next) {
    res.render('login', {
        pagename: 'login',
        title: 'login page'
    });
});

/*
 * Use the empty template to say thank you for being authenticated
 */
router.get('/regok', auth.cantBeAuthenticated, function(req, res, next) {
    res.render('empty', {
        pagename: 'home',
        title: 'Merci pour votre enregistrement',
        content: '<div style="text-align:center"><h3> Merci pour votre enregistrement !</h3><p>Vous allez recevoir un super lien par email</p></div>'
    })
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
