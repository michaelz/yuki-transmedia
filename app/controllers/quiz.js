var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Quiz_food_question = mongoose.model('Quiz_food_question');

module.exports = function (app) {
    app.use('/api/quiz', router);
};

/**
 * get all questions
 */
router.get('/', function (req, res, next) {

    Quiz_food_question.find(function (err, quiz_food_question) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(quiz_food_question);
    });

});
/**
 * get a specific question
 */
router.get('/:id', function (req, res, next) {


    var questionId = req.params.id;
    Quiz_food_question.findById(questionId, function(err, quiz_food_question){
        if (err){
            res.status(500).send(err);
            return;
        } else if(!quiz_food_question){
            res.status(404).send("question not found");
        }
        res.send(quiz_food_question);
    });

});
/**
 * post a question with answers
 */
router.post('/', function (req, res, next) {
    var quiz_food_question = new Quiz_food_question(req.body);

    quiz_food_question.save(function(err, Created_quiz_food_questions){
        if (err){
            res.status(500).send(err);
            return;
        }
        res.send(Created_quiz_food_questions);
    });
});

/**
 * delete question
 */
router.delete("/:id", function(req, res, next){
    var questionId = req.params.id;
    Quiz_food_question.remove({
        _id: questionId
    }, function(err, data){
        if (err){
            res.status(500).send(err);
            return;
        }
        console.log('Deleted' + data + 'documents');
        res.sendStatus(204);
    });
});


/**
 * modify a question
 */

router.put("/:id", function(req, res, next){
    var questionId = req.params.id;
    Quiz_food_question.findById(questionId, function(err, quiz_food_question){
        if (err){
            res.status(500).send(err);
            return;
        }
        else if(!quiz_food_question){
            res.status(404).send("question not found");
        }
        quiz_food_question.question = req.body.question;
        quiz_food_question.position = req.body.position;
        quiz_food_question.answers = req.body.answers;
        quiz_food_question.img = req.body.img;

        quiz_food_question.save(req.body, function(err, updatedQuestion){
            if(err){
                res.status(500).send(err);
                update();
            }
            res.send(updatedQuestion);
        });
    });
});