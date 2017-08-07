const { User } = require('../../db');

module.exports = async (id, done) => {
  const user = await User.deserializeUser(id);
  return done(null, user);
};
