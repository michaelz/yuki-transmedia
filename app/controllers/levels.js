var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Level = mongoose.model('Level'),
    User = mongoose.model('User'),
    tools = require('../services/tools'),
    auth = require('../services/auth');


module.exports = function(app) {
    app.use('/api/level', router);
};

/**
 * get all levels
 */
router.get('/', function(req, res, next) {
    Level.find({}, "code release_date keys.key clue url keys._id is_world", function(err,
        levels) {

        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(levels);
    });
});

/**
 * get all games
 */

router.get('/listGames', function(req, res, next) {


    Level.find({is_world: "true"}, "code release_date keys.key clue url keys._id is_world", function(err,
        levels) {

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
    }, "code release_date keys.key clue url").exec(function(err,
        levels) {
        if (err) {
            res.status(500).send(err);
            return
        }
        res.send(levels);
    })
});

router.get('/japanimpact', function(req, res, next) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();

    Level.findOne({
        code: 'japanimpact'
    }).exec(function(err, level) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!level) {
            res.status(404).send('level not found');
            return;
        }
        if (new Date(level.release_date) <
            new Date(localISOTime)) {
            res.send(true);
            return;
        }
        res.send(false);
    });
});


/**
 *  Get passed levels
 */
function levels(req, res, next) {

    Level.find({}, "code clue url", function(err,
        levels) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        req.levels = levels
        next();
    });
}
router.get('/passed', auth.mustBeAuthenticated, levels, function(req, res, next) {
    var levels = [];
    var exist = false;
    var existInLevel = false;

    req.connectedUser.passed_levels.forEach(function(passed_levels) {
        req.levels.forEach(function(level) {
            if (level.code == passed_levels.code && !
                exist) {
                exist = true;
                levels.forEach(function(listLevel) {
                    if (listLevel.code == level
                        .code) existInLevel =
                        true;
                })
                if (!existInLevel) {
                    var b64;
                    if (level.clue.data) {
                        b64 = new Buffer(level.clue
                            .data);
                    }
                    levels.push({
                        code: level.code,
                        picture: 'data:' +
                            level.clue.contentType +
                            ';base64,' + b64,
                        url: level.url
                    });
                }
            }

        });
        existInLevel = false;
        exist = false;
    });
    res.send(levels);
});

/**
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
        level.is_world = req.body.is_world;

        if (req.body.clue) level.clue = req.body.clue;
        if (req.body.keys) level.keys = req.body.keys;

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
router.post('/passLevelUser/:code/', auth.mustBeAuthenticated, 
    function(req, res, next) {


        var user = req.connectedUser;

        //console.log(user);

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
            //user.passed_levels.push(newInput);

            var newLevelPassed = user.passed_levels;
            var exist = false;
            var count = 0;

            //efface le score si il est moint fort
            user.passed_levels.forEach(function (levelPassed){
                if (levelPassed.level_id.equals(level._id)) {
                    if (level.code != "calligraphy"){
                        if (levelPassed.result < newResult) {
                            newLevelPassed.splice(count, 1);
                            newLevelPassed.push(newInput);
                        } 
                    } else {
                        if (parseInt(levelPassed.result) > parseInt(newResult)) {
                            newLevelPassed.splice(count, 1);
                            newLevelPassed.push(newInput);
                        } 
                    }
                    exist = true;
                } 
                count++;
            });
            
            if (!exist) newLevelPassed.push(newInput);

            user.passed_levels = [];
            user.passed_levels = newLevelPassed;
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
//Todo validator

/**
 * validate
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
