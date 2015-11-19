var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: String,
    date: String,
    content: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Blog', BlogSchema);