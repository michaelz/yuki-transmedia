var express = require('express'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    router = express.Router(),
    Cookies = require('cookies'),
    User = mongoose.model('User'),
    MongoDBStore = require('connect-mongodb-session')(session);



const saltRounds = 10;
const salt = '$2a$10$RpO7eflB5oO7Otp01NgmFO';



//router.use(cookieParser());


module.exports = function(app) {
    app.use('/session', router, session({
        cookieName: 'session',
        secret: '2C44-4D44-WppQ38S',
        duration: 72 * 60 * 60 * 1000,
        activeDuration: 1000 * 60 * 5
    }));
    //app.use();
};

// Logout endpoint
router.get('/logout', function(req, res) {
    req.session.destroy();

    res.send("logout success!");
    //TODO check
});

// Logout endpoint
router.get('/cookies', function(req, res) {
    res.send(req.cookies);
});

router.post('/register', function(req, res) {
    var user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    var password = toString(req.body.password);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    user.save(function(err, createdUser) {
        console.log(createdUser);
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

router.post('/login', function(req, res) {
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
        }, function(err, user) {
            if (err) {
                res.jerror(err);
                return;
            } else if (!user) {
                res.jerror("User not found");
                return;
            } else {
                req.session.user = user;

                //if found, set session
                //res.cookie('email', "hello@lol.com").send(req.cookies.email);
                /*           req.cookies.email = user.email;*/
                //req.session.cookie.email = "hello";
                //req.cookies.email = "hello";
                /* req.cookies.id = user._id;
                  req.session.id = user._id;*/
                /*var cookies = new Cookies(req, res, {
                        "email": user.email
                    }),
                    signed;
                cookies.set("email", user.email, {
                    signed: false
                });*/

                // res.cookie('email', user.email, {signed: true}).send("okay");

                //res.redirect('/');
                res.jsend('plop');
            }
        });

    }
});
