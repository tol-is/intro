const BaseConnector = require('../base_connector');
const User = require('./model');

class UserConnector extends BaseConnector {

  async findUsersByIds (user_ids) {
    let res = await User.find({_id: {$in: user_ids}});
    return user_ids.map(_id => res.find(r => r._id.toString() === _id.toString()));
  }

  async findUserById (_id) {
    return User.findOne({_id});
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
