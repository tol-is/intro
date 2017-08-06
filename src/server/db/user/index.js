const BaseConnector = require('../base_connector');
const User = require('./model');

class UserConnector extends BaseConnector {

  async findById (_id) {
    return User.findById(_id);
  }

  async create (args) {
    let user = new User(args);
    return await user.save();
  }

  async findUsersByIds (user_ids) {
    let res = await User.find({_id: {$in: user_ids}});
    return user_ids.map(_id => res.find(r => r._id.toString() === _id.toString()));
  }

  async list (query) {
    // make query
    const q = query || {};
    q.reserved = false;

    // query db
    const results = await User.find(q);
    return results;
  }

  // async find user by email
  async findByProp (prop, value) {
    let q = {};
    q[prop] = value;
    return await User.findOne(q);
  }

  // async find user by email
  async findByEmail (email) {
    return await this.findByProp('email', email);
  }

  // async find user by google oauth id
  async findByProvider (provider, provider_id) {
    let user = {};
    if (provider === 'google')
      return await this.findByGoogleId(provider_id);
  }

  // async find user by google oauth id
  async findByGoogleId (google_id) {
    const providerQuery = { google: { id : google_id } };
    return await User.findOne(providerQuery)
  }

}

module.exports = new UserConnector();
