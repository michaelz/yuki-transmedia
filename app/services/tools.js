var jwt = require('jsonwebtoken'),
crypto = require('crypto'),
config = require('../../config/config'),
base64url = require('base64url');

module.exports = {

	//génère un token pour l0utilisateur qui se connecte
  	generate: function (user) {
		var header = {
			alg: "HS256",
			typ: "JWT"
		};

		var payload = {
			id: user.id,
		  	email: user.email,
		  	exp : Date.now() + 60 * 2 * 60 * 1000 //temps d'expiration : 120min
		};

		var signature = crypto.createHmac("SHA256", config.key).update(base64url(JSON.stringify(header)) + "." + base64url(JSON.stringify(payload))).digest("bin");
	 	
	 	return base64url(JSON.stringify(header)) + 
		 	"." + 
		 	base64url(JSON.stringify(payload)) + "." + 
		 	base64url(signature);
	},

	//Vérifie si le token de l'utilisateur est valide
  	verifyToken: function verifyToken(req, res, next) {
	  	var token = req.get('Authentification');
	  	if (!token) {
	  		token = req.query.token;
	  	}

		var tokenValidate = false;
		if (token === "null" || !token) {
			res.status(400).send('No token');
			return;
		}

		var tokenTab = token.split(".");
		if (tokenTab.length != 3) {
			res.status(400).send('Invalid token');
			return;
		}

		var signature = crypto.createHmac("SHA256", config.key).update(tokenTab[0] + "." + tokenTab[1]).digest("bin");  
	  	if (base64url(signature) != tokenTab[2]) {
			res.status(400).send('Invalid token');
			return;
		}

		var payloadDecode =  base64url.decode(tokenTab[1]);
		if (Date.now() > JSON.parse(payloadDecode).exp) {
			res.status(400).send('Token date expirated');
			return;
		} 

		req.email = JSON.parse(payloadDecode).email;
		req.idUser = JSON.parse(payloadDecode).id;
		next();
  	},
  	verifyTokenWS: function verifyToken(token) {
	  	if (!token) return false;

		var tokenTab = token.split(".");
		if (tokenTab.length != 3) return false;

		var signature = crypto.createHmac("SHA256", config.key).update(tokenTab[0] + "." + tokenTab[1]).digest("bin");  
	  	if (base64url(signature) != tokenTab[2]) return false;

		var payloadDecode =  base64url.decode(tokenTab[1]);
		if (Date.now() > JSON.parse(payloadDecode).exp) return false;
		
		return token;
  	},

};
