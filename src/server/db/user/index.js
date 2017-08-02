const BaseConnector = require('../base_connector');
const User = require('./model');

class UserConnector extends BaseConnector {

  async findUserById (_id) {
    return await User.findOne({_id});
  }

  // async find user by email
  async findUserByEmail (email) {
    return await User.findOne({email});
  }

  // async find user by google oauth id
  async findUserByProvider (provider, providerId) {
    let user = {};
    if (provider === 'google')
      return await findUserByGoogleId(providerId);
  }

  // async find user by google oauth id
  async findUserByGoogleId (googleId) {
    const providerQuery = { google: { id : profile.id } }
    return await User.findOne(providerQuery)
  }

  // module.exports = db => (id, cb) => {
  //   const User = db.model('User');
  //   User.findById(id).exec((err, user) => {
  //     cb(err, user);
  //   });
  // }

  serializeUser (user) {
    return user.id;
  }

  async deserializeUser () {
    return await User.findById(id);
  }

  findOrCreateByOAuthProfile () {
    console.log('find or create by profile');
  }

}

module.exports = new UserConnector();
