module.exports = db => (req, accessToken, refreshToken, profile, cb) => {

  // User connection
  const { User } = db

  // create async function to find or create user
  const findOrCreate = async (profile, token) => {
    let user;

    try {
      // auth profile email
      const authEmail = profile.emails[0].value;

      // find user by provider id
      const providerQuery = { google: { id : profile.id } }
      user = await User.findOne(providerQuery)

      // if user found return
      if (user) return cb(null, user);

      // find user by provider email
      const emailQuery = { email:  authEmail}
      user = await User.findOne(emailQuery)

      // if user found return
      if (user) return cb(null, user);

      // create new user
      user = new User({
        email : authEmail,
        name_first: profile.name.givenName,
        name_last : profile.name.familyName,
        google : {
          id : profile.id,
          token: token
        }
      });

      // save user
      await user.save()

      // return newly created user
      return cb(null, user);
    }
    catch (e) {
      console.log(e)
    }

  };
  // make async call
  findOrCreate(profile, accessToken);

}
