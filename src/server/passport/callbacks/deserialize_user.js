const { User } = require('../../db');

module.exports = async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
};
