var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Guess = new Schema({
    username: String,
    date: Date
});

module.exports = mongoose.model('Guess', Guess);
