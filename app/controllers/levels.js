var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Level = mongoose.model('Level'),
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
        });
    });
});


/**
 * Pass a level
 */
router.post('/passLevelUser/:idLevel/', auth.mustBeAuthenticated, auth.getUserInfo, function (req, res, next) {


    user = req.connectedUser;


    console.log(user);

    var level = Level.findById(req.params.idLevel, function (err, level) {
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
            "level_id": req.params.idLevel,
            "result": newResult
        };

        user.passed_levels.push(newInput);


        user.save(function (err, updatedUser) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send(updatedUser);
        });


    });

});

/*
 passed_levels: [
 {
 level_id: {
 type: Schema.Types.ObjectId,
 required: false,
 ref: "Level"
 },
 result: String //here we can save any result we want for any game that has been passed

 }

 ]*/
