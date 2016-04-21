var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bcrypt = require('bcrypt'),
    cookieParser = require('cookie-parser'),
    Cookies = require('cookies'),
    User = mongoose.model('User');


const saltRounds = 10;

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
router.use(cookieParser());


module.exports = function (app) {
    app.use('/session', router);

};

// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    req.clearCookie(req.cookies);
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

router.post('/login', function (req, res) {
    if (!req.body.identifier || !req.body.password) {
        res.send('login failed, no pswd or username input');
    } else {

        var criteria = {};
        criteria.email = req.body.identifier; //username or email
       // res.send(criteria.email);
        //criteria.username = req.body.identifier; //username or email
        //encrypt pswd
        var salt = bcrypt.genSaltSync(saltRounds);
        var password = toString(req.body.password);
        var hash = bcrypt.hashSync(password, salt);
       // criteria.password = hash;
        //criteria.password = req.body.password;
        //find user
        User.findOne(criteria, function(err, user){
            if(err){
                res.jerror(err);
                return;
            } else if (!user){
                res.jerror("User not found");

                return;
            } else {
                req.session.email = user.email;
                //if found, set session
               //res.cookie('email', "hello@lol.com").send(req.cookies.email);
     /*           req.cookies.email = user.email;*/
                //req.session.cookie.email = "hello";
                //req.cookies.email = "hello";
               /* req.cookies.id = user._id;
                 req.session.id = user._id;*/
               var cookies = new Cookies(req, res, {"email": user.email}),signed;
                cookies.set("email", user.email, {signed:false});

               // res.cookie('email', user.email, {signed: true}).send("okay");


                res.send("login success! with email : ");
            }
        });



    }
});



