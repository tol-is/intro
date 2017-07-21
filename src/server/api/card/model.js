let mongoose = require('mongoose')

let cardSchema = new mongoose.Schema({

  title : {
    required  : true,
    type      : String,
    trim      : true
  },

  description : {
    type      : String,
    trim      : true
  },

  created_date : {
    type      : Date,
    default   : Date.now,
    index     : true
  }
})

module.exports = mongoose.model('Card', cardSchema)
