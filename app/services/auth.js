var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {

    // must be authenticated
    mustBeAuthenticated: function(req, res, next) {
        //console.log(req.session.plop);
        if (req.session && req.session.user) {
            User.findOne({
                'username': req.session.user
            }, function(err, user) {
                if (err) {
                    res.jerror('no user found')
                    return;
                }
                req.connectedUser = user;
                return next();
            });
            return;
        }
        // redirect to login with query
        res.redirect('/login'); // can be fun to add a ?q= to get the original query
    },
    // this function redirects if user is already authenticated
    cantBeAuthenticated: function(req, res, next) {

        if (req.session.user) {
            res.send(403, 'already logged in !');
            return;
        }
        next();
    },

    isAdmin: function(req, res, next) {

        if (req.session.user == "admin") {
            next();
        } else {
            res.redirect('/');
        }
    },

    // Get user information
    getUserInfo: function(req, res, next) {
        User.findOne({
            'username': req.session.user
        }, function(err, user) {
            if (err) {
                res.jerror('no user found')
                return;
            }
            req.connectedUser = user;
            return next();
        });
    }
}
