const express = require('express');
const router = express.Router();
var Account = require('../models/account');
/* GET users listing. */
router.get('/', function(req, res, next){
  Account.find({},function(err,users){
    res.render('users',{ user : req.user,users: users});
  });
});

module.exports = router;
