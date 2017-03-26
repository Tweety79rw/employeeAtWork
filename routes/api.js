var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Guess = require('../models/guess');
var Actual = require('../models/actual');
var router = express.Router();

router.get('/arivals', function (req, res) {
  var username = req.user?req.user.username:'';
  Actual.find({},function(err,arivals){
    var json = {
      arivals:arivals
    };
    if(username.length > 0){
      Guess.find({'username':username},function(err,guesses){
        json['guesses']=guesses;
        res.json(json);
      });
    }else{
      res.json(json);
    }
  })
});

module.exports = router;
