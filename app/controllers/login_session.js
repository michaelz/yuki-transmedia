var express = require('express'),
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    session = require('express-session'),
    router = express.Router(),
//Cookies = require('cookies'),
    User = mongoose.model('User'),
    auth = require('../services/auth'),

    MongoDBStore = require('connect-mongodb-session')(session);


const saltRounds = 10;
const salt = '$2a$10$RpO7eflB5oO7Otp01NgmFO';


module.exports = function (app) {
    app.use('/session', router);
};

// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

/**
 * Register new user
 */
router.post('/register', function (req, res) {
    var user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    var password = toString(req.body.password);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    user.save(function (err, createdUser) {
        console.log(createdUser);
        if (err) {
            console.log(err.toJSON());

            var regex = /\.users\.\$(\w*)/g

            var errorRegex = regex.exec(err.errmsg);

            res.jerror(errorRegex[1]);


            return;
        }
        req.session.user = user.username; // Automated login on register
        res.jsend({
            username: user.username,
            email: user.email
        });
        return;
    });
});

router.post('/login', function (req, res) {
    if (!req.body.identifier || !req.body.password) {
        res.jerror('login failed, no pswd or username input');
    } else {
        var criteria = {};
        var hash = bcrypt.hashSync(toString(req.body.password), salt);
        // Find the user with either login or password
        User.findOne({
            $or: [{
                username: req.body.identifier
            }, {
                email: req.body.identifier
            }],
            password: hash
        }, function (err, user) {
            if (err) {
                res.jerror(err);
                return;
            } else if (!user) {
                res.jerror("User not found");
                return;
            } else {
                req.session.user = user.username;
                res.jsend("Welcome " + user.username + "!")
                return;
            }
        });

    }
});
