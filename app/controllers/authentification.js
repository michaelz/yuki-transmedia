var express = require('express'),
async = require('async'),
router = express.Router(),
tools = require('../services/tools'),
jwt = require('jsonwebtoken'),
mongoose = require('mongoose'),
crypto = require('crypto'),
User = mongoose.model('User'),
base64url = require('base64url');

require('express-jsend');

module.exports = function (app) {
	app.use('/api/auth', router);
};
/**
 * login
 */
router.post('/', function (req, res, next){
 	var criteria = {};
 	criteria.email = req.body.email;
 	criteria.password = req.body.password;

 	User.findOne(criteria, function(err, user){
		if(err){
			res.status(500).send(err);
			return;
		} else if (!user){
			res.status(404).send("User not found");
			return;
		} else {
			var token = tools.generate(user);
			res.jsend(token);
		}
	});
});

router.post('/register', function (req, res, next){
 	var user = new User(req.body);

 	user.save(function(err, createdUser){
 		if (err) {
 			res.status(500).send(err);
 			return;
 		}

 		res.send(createdUser); //TODO rend le token aussi
 	});
 });