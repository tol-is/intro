const User = require('./model');

class UserConnector {

  async findUserByEmail (email) {
    const result = await User.findOne({email});
    return result;
  }

  async findUserByGoogleId (googleId) {
    const providerQuery = { google: { id : profile.id } }
    const user = await User.findOne(providerQuery)
    return result;
  }

  serializeUser () {
    console.log('serialize user');
  }

  deserializeUser () {
    console.log('deserialize user');
  }

  findOrCreateByOAuthProfile () {
    console.log('find or create by profile');
  }



}

module.exports = UserConnector;
