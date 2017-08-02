var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name_first: {
    type: String,
    trim: true
  },

  name_last: {
    type: String,
    trim: true
  },

  email: {
    type      : String,
    required  : true,
    index     : true,
  },

  // Google OpenID Integration
  google: {
    id: {
      type  : String,
      sparse: true,
      unique: true
    },
    token: String
  }

});

module.exports = mongoose.model('User', userSchema);
