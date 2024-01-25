const mongoose = require('mongoose');

const MarkSchema = mongoose.Schema({

  userid: {
    type: String,
    required:true
  },
  mark: {
    type: Number,
    required: true
  },

  date: {
    type: String,
    required:true
  },

  time: {
    type:String,
    required:true
  }


});

module.exports = mongoose.model('Mark', MarkSchema);