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

