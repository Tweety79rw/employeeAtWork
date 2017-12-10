var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Actual = new Schema({
    username: String,
    date: Date,
    excuse: String
});

module.exports = mongoose.model('Actual', Actual);
