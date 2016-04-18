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

    Quiz_food_question.find(function (err, quiz_food_question) {
        if (err) {
            res.status(500).send(err);
            return;
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
