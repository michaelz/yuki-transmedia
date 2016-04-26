var express = require('express'),
    router = express.Router(),
    config = require('../../config/config'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    auth = require('../services/auth');
var level = require('../services/level');

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
router.get('/', function(req, res,
    next) {
    if (req.session.user) {
        res.render('map', {
            pagename: 'map',
            title: 'Mondes',
            user: req.session.user
        });
    } else {
        res.render('introduction', {
            pagename: 'introduction',
            title: 'Yuki et la tasse brisée'
        });
    }
});


/**
 * Introduction route.
 */
router.get('/mondes/ojiisan', auth.mustBeAuthenticated, function(req, res, next) {
    res.render('introduction', {
        pagename: 'introduction',
        title: 'Yuki chez Ojiisan',
        user: req.connectedUser.username
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

/**
 * admin route.
 */
router.get('/admin', auth.mustBeAuthenticated, function(req, res, next) {
    if (req.session.user == "admin") {
        res.render('admin', {
            pagename: 'admin',
            title: 'Admin',
            user: req.connectedUser.username
        });
    } else {
        res.redirect('/');
    }
});

router.get('/admin/ajoutMonde', auth.mustBeAuthenticated, function(req, res,
    next) {
    if (req.session.user == "admin") {
        res.render('formLevel', {
            pagename: 'formLevel',
            title: 'Nouveau monde',
            user: req.connectedUser.username
        });
    } else {
        res.render('map', {
            pagename: 'map',
            title: 'Mondes'
        });
    }
});

router.get('/admin/:id', auth.mustBeAuthenticated, function(req, res, next) {
    if (req.session.user == "admin") {
        res.render('formLevel', {
            pagename: 'formLevel',
            title: 'Modifier un monde',
            user: req.connectedUser.username
        });
    } else {
        res.redirect('/');
    }
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
router.get('/mondes/artsmartiaux', auth.mustBeAuthenticated, level.getLevelAuth(
    "martialarts"), function(req, res, next) {
    res.render('martialArts', {
        pagename: 'martialarts',
        title: 'martialArts page',
        user: req.connectedUser.username
    });
});

/**
 * Calligraphy route.
 */
router.get('/mondes/calligraphie', auth.mustBeAuthenticated, level.getLevelAuth(
    "calligraphy"), function(req, res, next) {
    res.render('calligraphy', {
        pagename: 'calligraphy',
        title: 'Calligraphy page',
        user: req.connectedUser.username
    });
});


/**
 * Food route.
 */
router.get('/mondes/nourriture', auth.mustBeAuthenticated, level.getLevelAuth(
    "food"), function(req, res, next) {
    res.render('food', {
        pagename: 'food',
        title: 'food Quizz page',
        user: req.connectedUser.username
    });
});

/**
 * Origamis route.
 */
router.get('/mondes/origamis', auth.mustBeAuthenticated, level.getLevelAuth(
    "origami"), function(req, res, next) {
    res.render('origami', {
        pagename: 'origami',
        title: 'Yuki dans le mondes des origamis',
        user: req.connectedUser.username
    });
});

/**
 * Pop culture route.
 */
router.get('/mondes/popculture', auth.mustBeAuthenticated, level.getLevelAuth(
    "popculture"), function(req, res, next) {
    res.render('popculture', {
        pagename: 'popculture',
        title: 'Yuki dans le monde de la Pop culture',
        user: req.connectedUser.username
    });
});



/**
 * Outro route.
 */
router.get('/outro', auth.mustBeAuthenticated, level.getLevelAuth("outro"),
    function(req, res, next) {
        res.render('outro', {
            pagename: 'outro',
            title: 'outro page',
            user: req.connectedUser.username
        });
    });
