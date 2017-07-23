const passport = require('passport')
const config = require('../../../config')

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope : [ config.auth_google.scope ]
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
  }));
}
