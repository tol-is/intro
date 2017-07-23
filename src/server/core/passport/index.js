const passport = require("passport")

const google = require("./strategies/google")
const config = require("../../config")

module.exports = function(app, db){

  require('./session')(app, db);

  app.use(passport.initialize())

  app.use(passport.session())

  const serialize_callback = require("./callbacks/serialize_user")(db)
  passport.serializeUser(serialize_callback);

  const deserialize_callback = require("./callbacks/deserialize_user")(db)
  passport.deserializeUser(deserialize_callback);

  const oauth_callback = require("./callbacks/oauth")(db)
  passport.use(google(config.auth_google, oauth_callback));

}
