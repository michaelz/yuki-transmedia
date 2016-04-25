var express = require('express'),
async = require('async'),
router = express.Router(),
mongoose = require('mongoose');
var multer  = require('multer');
var fs = require('fs');
var app=express();
auth = require('../services/auth');

require('express-jsend');

module.exports = function (app) {
  app.use('/api/picture/upload', router);  
};


var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '../storage/');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).array('img', 5);

router.post('/', auth.getUserInfo, function(req, res, next) {
  var filesBase64 = [];
  upload(req, res, function(err) {
    if(err) {
      console.log('Error Occured');
      return;
    }

    var base64data = req.body.img.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("storage/yukiCustom/" + req.connectedUser.id + Date.now() + ".png", base64data, 'base64', function (err) {
      if (err) console.log(err);
      console.log('Photo Uploaded');
    })
  })
  res.redirect("back");
});

