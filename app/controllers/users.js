var express = require('express'),
async = require('async'),
router = express.Router(),
mongoose = require('mongoose'),
User = mongoose.model('User');

require('express-jsend');

module.exports = function (app) {
	app.use('/api/user', router);
};
//Retourne la liste des utilisateurs
router.get('/', function (req, res, next){
 	User.find(function(err, user){
		if(err){
			res.status(500).send(err);
			return;
		} else if (!user){
			res.status(404).send('User not found');
			return;
		}
		res.jsend(user);
	});
 });

//Ajout d'un utilisateur
router.post('/', function (req, res, next){
 	User.find(function(err, user){
		if(err){
			res.status(500).send(err);
			return;
		} else if (!user){
			res.status(404).send('User not found');
			return;
		}
		res.jsend(user);
	});
 });

//Affiche un utilisateur
router.get('/:id', function (req, res, next){
 	User.findById(req.params.id, function(err, user){
		if(err){
			res.status(500).send(err);
			return;
		} else if (!user){
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


