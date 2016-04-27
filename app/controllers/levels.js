var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Level = mongoose.model('Level'),
    User = mongoose.model('User'),


    //  nodemailer = require('nodemailer');
    mailgun = require('mailgun-js');
tools = require('../services/tools');
auth = require('../services/auth');



module.exports = function(app) {
    app.use('/api/level', router);
};

/**
 * get all levels
 */
router.get('/', function(req, res, next) {

    Level.find(function(err, levels) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(levels);
    });

});

/**
 * Get all active levels
 */
router.get('/active', function(req, res, next) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    Level.find({
        release_date: {
            $lt: localISOTime
        },
    }).exec(function(err, levels) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.send(levels);
    })
});

/**x
 * get a specific level
 */
router.get('/:id', function(req, res, next) {

    var levelId = req.params.id;
    Level.findById(levelId, function(err, level) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!level) {
            res.status(404).send("question not found");
        }
        res.send(level);
    });

});
/**
 * post a level
 */
router.post('/', function(req, res, next) {
    var level = new Level(req.body);
    level.save(function(err, CreatedLevel) {
        if (err) {
            res.send(500, err);
            return;
        }
        res.send(CreatedLevel);
    });
});

/**
 * delete level
 */
router.delete("/:id", function(req, res, next) {
    var levelId = req.params.id;
    Level.remove({
        _id: levelId
    }, function(err, data) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        console.log('Deleted' + data + 'documents');
        res.sendStatus(204);
    });
});


/**
 * modify a level
 */

router.put("/:id", function(req, res, next) {
    var levelId = req.params.id;
    Level.findById(levelId, function(err, level) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!level) {
            res.status(404).send("level not found");
        }

        level.code = req.body.code;
        level.url = req.body.url;
        level.release_date = req.body.release_date;

        if (req.body.clue) level.clue = req.body.clue;
        if (req.body.solution) level.solution = req.body.solution;

        level.save(req.body, function(err, updatedLevel) {
            if (err) {
                res.status(500).send(err);
                update();
            }
            res.send(updatedLevel);
        });
    });
});


/**
 * Pass a level
 */
router.post('/passLevelUser/:code/', auth.mustBeAuthenticated, auth.getUserInfo,
    function(req, res, next) {


        var user = req.connectedUser;

        console.log(user);

        var level = Level.findOne({
            code: req.params.code
        }, function(err, level) {
            if (err) {
                res.status(500).send(err);
                return;
            } else if (!level) {
                res.status(404).send("level not found");
            }


            var newResult = "";

            if (req.body.result) {
                newResult = req.body.result;

            }
            //assign level and result


            var newInput = {
                "level_id": level._id,
                "code": level.code,
                "result": newResult
            };
            //res.send(newInput);
            user.passed_levels.push(newInput);
            user.markModified('passed_levels');

            user.save(function(err, updatedUser) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(updatedUser);
            });


        });

    });
