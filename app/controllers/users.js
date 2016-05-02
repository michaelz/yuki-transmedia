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
 * check if combination for keys is right
 */

router.post("/keys/check", function (req, res, next) {

    //martialArts
    /*   var martialArts = req.body.content[0];
     var calligraphy = req.body.content[1];*/

    console.log(req.body.content);

    var rightKeys = [];



    req.body.content.forEach(function (level) {
        console.log("levels:"+level.levelCode);


        Level.findOne({
            code: level.levelCode

        }).exec(function (err, level) {

            if (err) {
                res.status(500).send(err);
                return;
            }
            if (!level) {
                res.status(404).send('level not found');
                return;
            }

            console.log("level.keys: " +level.keys);
            level.keys.forEach(function (key) {
                if (key.is_true) {
                    console.log( "key: "+ key.key);
                    rightKeys.push(key.key);
                }
            });
            if(rightKeys.length = req.body.content.length) {
                console.log("right keys: " + rightKeys);
                res.send(rightKeys);
            }

        });

    });



    //res.jsend({"keys" : rightKeys});
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

