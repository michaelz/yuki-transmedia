var express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

module.exports = function (app) {
    app.use('/session', router);
};

router.get('/', function (req, res, next) {

    req.session.yolo = "yolo";
    res.send(200,'yolo');

});
