var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Guess = require('../models/guess');
var Actual = require('../models/actual');
var router = express.Router();


router.get('/', function (req, res) {
  var dayAgo = new Date();
  dayAgo.setHours(0,0,0,0);
  Actual.find({}).where('date').gt(dayAgo).limit(1).exec(function(err,act){
    if(req.user){
      Guess.find({username:req.user.username}).where('date').gt(dayAgo).limit(1).exec(function(err,guess){
        res.render('index', { user : req.user,guess:guess,actual:act,error:err });
      });
    }else{
      res.render('index', { user : req.user,actual:act });
    }
  });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
          req.session.save(function (err) {
              if (err) {
                  return next(err);
              }
              res.redirect('/');
          });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.post('/submit_guess',function(req,res){
  var str = req.body.guess;
  var date = new Date(),
  parts = str.match(/(\d+):(\d+)/);
  date.setHours(parseInt(parts[1]));
  date.setMinutes(parseInt(parts[2]));
  var guess = new Guess({username:req.user.username,date:date});
  guess.save(function(err){
    if(err)console.log(err);
    console.log('saved guess');
    res.redirect('/');
  })
});
router.post('/submit_arival',function(req,res){
  var str = req.body.arival;
  var exc = req.body.excuse;
  var date = new Date(),
  parts = str.match(/(\d+):(\d+)/);
  date.setHours(parseInt(parts[1]));
  date.setMinutes(parseInt(parts[2]));
  var guess = new Actual({username:req.user.username,date:date,excuse:exc});
  guess.save(function(err){
    if(err)console.log(err);
    console.log('saved guess');
    res.redirect('/');
  })
});

module.exports = router;
