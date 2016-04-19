var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Level = mongoose.model('Level');
    User = mongoose.model('User');
    tools = require('../services/tools');


module.exports = function (app) {
    app.use('/api/level', router);
};

/**
 * get all levels
 */
router.get('/', function (req, res, next) {

    Level.find(function (err, levels) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(levels);
    });

});


/**
 * get a specific level
 */
router.get('/:id', function (req, res, next) {


    var levelId = req.params.id;
    Level.findById(levelId, function (err, level) {
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
router.post('/', function (req, res, next) {
    var level = new Level(req.body);

    level.save(function (err, CreatedLevel) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(CreatedLevel);
    });
});

/**
 * delete level
 */
router.delete("/:id", function (req, res, next) {
    var levelId = req.params.id;
    Level.remove({
        _id: levelId
    }, function (err, data) {
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

router.put("/:id", function (req, res, next) {
    var levelId = req.params.id;
    Level.findById(levelId, function (err, level) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        else if (!level) {
            res.status(404).send("level not found");
        }
        level.question = req.body.question;
        level.number = req.body.number;
        level.name = req.body.name;
        level.release_date = req.body.release_date;
        level.additional_info = req.body.additional_info;
        level.description = req.body.description;
        level.clue = req.body.clue;
        level.solution = req.body.solution;

        level.save(req.body, function (err, updatedLevel) {
            if (err) {
                res.status(500).send(err);
                update();
            }
            res.send(updatedLevel);
        })
    });
});


/**
 * Pass a level
 */
router.post('/passLevelUser/:idLevel/', function (req, res, next) {


    var levelId = req.params.idLevel;
    var userToken = req.params.authentification;
        var userValided = tools.verifyToken(userToken);

    Level.findById(levelId, function (err, quiz_food_question) {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!quiz_food_question) {
            res.status(404).send("question not found");
        }

        //find user


        res.status(200).send("level passed");
    });

});
