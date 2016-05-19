var mongoose = require('mongoose');

var TodoSchema =  new mongoose.Schema({
   completed: Boolean,
   snoozed: Boolean,
    text : {type : String, required: true, default: ''}
});

module.exports = mongoose.model('Todo', TodoSchema);
