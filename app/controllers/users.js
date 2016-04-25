var express = require('express'),
    async = require('async'),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session'),
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


router.get("/me", function (req, res) {
    res.send(req.cookies);

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

//Ajout d'un utilisateur
router.post('/', function (req, res, next) {
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
 * modify a user
 */

router.put("/:id", function (req, res, next) {
    var userId = req.params.id;
    User.findById(userId, function (err, level) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        else if (!user) {
            res.status(404).send("user not found");
        }
        user.email = req.body.email;
        user.password = req.body.password;
        user.username = req.body.username;
        user.solved_solutions = req.body.solved_solutions;
        user.passed_levels = req.body.passed_levels;

        user.save(req.body, function (err, updatedUser) {
            if (err) {
                res.status(500).send(err);
                update();
            }
            res.send(updatedUser);
        })
    });
});




