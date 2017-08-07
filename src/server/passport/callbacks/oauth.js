const db  = require('../../db');

module.exports = async (req, accessToken, refreshToken, profile, verify) => {

  // User connection
  const { User } = db;

  let user = null;

  // find user by provider id and verify
  const providerQuery = { google: { id : profile.id } }
  user = await User.findByProvider('google', profile.id)
  if (user) return verify(null, user);

  // find user by emails and verify
  const authEmail = profile.emails[0].value;
  user = await User.findByEmail(authEmail);

  // if use exists return verified user
  if (user)
    return verify(null, user);

  // create new user and return
  user = await User.create({
    email        : authEmail,
    name_first   : profile.name.givenName,
    name_last    : profile.name.familyName,
    google_id    : profile.id,
    google_token : accessToken
  });

  // return verified user
  return verify(null, user);

}
