var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

const saltRounds = 10;

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

module.exports = function (app) {
    app.use('/session', router);
};

// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
});

// Logout endpoint
router.get('/cookies', function (req, res) {
    res.send(req.cookies);
});

router.post('/register', function (req, res) {
    var user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    var salt = bcrypt.genSaltSync(saltRounds);
    var password = toString(req.body.password);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    user.save(function (err, createdUser) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.jsend({
            username: user.username,
            email: user.email
        });
    });
});

