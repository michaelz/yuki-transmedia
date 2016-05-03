var express = require('express'),
    async = require('async'),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    Level = mongoose.model('Level'),
    auth = require('../services/auth');
User = mongoose.model('User');

require('express-jsend');

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));


module.exports = function (app) {
    app.use('/api/user', router);
};


router.get("/me", auth.mustBeAuthenticated, auth.getUserInfo, function (req, res) {
    res.jsend(req.connectedUser);

});


//Retourne la liste des utilisateurs
router.get('/', function (req, res, next) {
    User.find(function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.jsend(user);
    });
});

/**
 * création d'un utilisateur
 */
/*router.post('/', function(req, res, next) {
 User.find(function(err, user) {
 if (err) {
 res.status(500).send(err);
 return;
 } else if (!user) {
 res.status(404).send('User does not exist');
 return;
 }
 res.jsend(user);
 });
 });*/

//Affiche un utilisateur
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.jsend(user);
    });
});

/**
 * All keys right
 */
router.post("/keys/check", function (req, res, next) {
    
});

/**
 * check if combination for keys is right
 */

router.post("/keys/check", auth.mustBeAuthenticated, auth.getUserInfo, function (req, res, next) {
    var rightKeys = [];
    var levelKeyUser = [];
    if(req.body.content) levelKeyUser = req.body.content;
    Level.find({is_world: "true"}, function(err,
        levelsBD) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        levelKeyUser.forEach(function (level) {
            levelsBD.forEach(function (levelBD) {
                levelBD.keys.forEach(function (key) {
                    if (key.is_true && key.key == level.key) {
                        rightKeys.push(key.key);
                    }
                })
            });
        });
        if (rightKeys.length == levelsBD.length) {
            res.send("true");
            /*User.findByIdAndUpdate (req.connectedUser._id, {$set: {finished: true}}, function (err, user) {
                if (err) return res.status(500).send(err);
                res.send("true");
            });*/
        } else {
            res.send("false");
        }
    });
});

/**
 * add selected keys
 */

router.put("/keys/:userid", function (req, res, next) {
    var userId = req.params.userid;
    User.findById(userId, function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!user) {
            res.status(404).send("user not found");
        }


        user.selectedKeys = req.body.selectedKeys;


        user.save(req.body, function (err, updatedUser) {
            if (err) {
                res.status(500).send(err);
                // update();
            }
            res.send(updatedUser);
        })
    });
});


/**
 * modify a user
 */

router.put("/:id", function (req, res, next) {
    var userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!user) {
            res.status(404).send("user not found");
        }
        user.email = req.body.email;
        user.password = req.body.password;
        user.username = req.body.username;
        user.solved_solutions = req.body.solved_solutions;
        user.passed_levels = req.body.passed_levels;
        user.selectedKeys = req.body.selectedKeys;

        user.save(req.body, function (err, updatedUser) {
            if (err) {
                res.status(500).send(err);
                // update();
            }
            res.send(updatedUser);
        })
    });
});
