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
	app.use('/api/v1/auth', router);
};

router.post('/', function (req, res, next){
 	var criteria = {};
 	criteria.name = req.body.name;
 	criteria.password = req.body.password;

 	User.findOne(criteria, function(err, user){
		if(err){
			res.status(500).send(err);
			return;
		} else if (!user){
			var user = new User(req.body);

		 	user.save(function(err, createdUser){
		 		if (err) {
		 			res.status(500).send(err);
		 			return;
		 		}
		 		var token = tools.generate(createdUser);
		 		res.jsend(token);
		 	});
			
			return;
		} else {
			var token = tools.generate(user);
			res.jsend(token);
		}
	});
 });