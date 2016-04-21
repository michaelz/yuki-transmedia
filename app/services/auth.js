var cookieParser = require('cookie-parser'),
    Cookies = require('cookies'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {

    // must be authenticated
    mustBeAuthenticated: function(req, res, next) {
        //console.log(req.session.plop);
        if (req.session && req.session.user) {
            console.log(req.session.user);
            return next();
        }
        res.redirect('/login');
    }
}
