const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  owner_id : {
    type     : mongoose.Schema.Types.ObjectId,
    required : true,
    index    : true
  },

  title : {
    type     : String,
    required : true,
    trim     : true
  },

  description : {
    type     : String,
    required : true,
    trim     : true
  },

  deleted : {
    type     : Boolean,
    required : true,
    index    : true,
    default  : false
  },

  created_date : {
    type    : Date,
    default : Date.now,
    index   : true
  }
});

module.exports = mongoose.model('Card', cardSchema);
