const passport = require('passport');
const config = require('../../config');

module.exports = app => {
  // google auth entry
  app.get('/auth/google', passport.authenticate('google', { scope : [ config.auth_google.scope ] }));

  // google auth callback
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
  }));
};
