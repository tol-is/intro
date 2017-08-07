const DataLoader = require('dataloader');
const User = require('./model');

module.exports = () => {

  // find by id
  this.findById = async _id => await User.findById(_id);

  // create
  this.create = async args => {
    const user = new User(args);
    return await user.save();
  };

  // list
  this.list = async () => {
    const q = {};
    return await User.find(q);
  };

  // async find user by email
  this.findByProp = async (prop, value) => {
    const q = {};
    q[prop] = value;
    return await User.findOne(q);
  };

  // async find user by email
  this.findByEmail = async email => await this.findByProp('email', email);

  // async find user by google oauth id
  this.findByProvider = async (provider, provider_id) => {
    if (provider === 'google')
      return await this.findByGoogleId(provider_id);
  };

  // async find user by google oauth id
  this.findByGoogleId = async google_id => {
    const providerQuery = { google : { id : google_id } };
    return await User.findOne(providerQuery);
  };

  this.userLoader = async user_ids => {
    const res = await User.find({ _id : { $in : user_ids } });
    return user_ids.map(_id => res.find(r => r._id.toString() === _id.toString()));
  };

  this.loader = new DataLoader(this.userLoader);

  // return closure
  return this;

};
