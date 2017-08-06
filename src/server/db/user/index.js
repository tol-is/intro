const DataLoader = require('dataloader');
const User = require('./model');

module.exports = {

  findById : async (_id) => {
    return User.findById(_id);
  },

  create : async (args) => {
    let user = new User(args);
    return await user.save();
  },

  list : async (query) => {
    const q = { reserved : false };
    return await User.find(q);
  },

  // async find user by email
  findByProp : async (prop, value) => {
    let q = {};
    q[prop] = value;
    return await User.findOne(q);
  },

  // async find user by email
  findByEmail : async (email) => {
    return await this.findByProp('email', email);
  },

  // async find user by google oauth id
  findByProvider : async (provider, provider_id) => {
    let user = {};
    if (provider === 'google')
      return await this.findByGoogleId(provider_id);
  },

  // async find user by google oauth id
  findByGoogleId : async (google_id) => {
    const providerQuery = { google: { id : google_id } };
    return await User.findOne(providerQuery)
  },

  loader : new DataLoader(async (user_ids) => {
    let res = await User.find({_id: {$in: user_ids}});
    return user_ids.map(_id => res.find(r => r._id.toString() === _id.toString()));
  })

}

