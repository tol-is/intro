const { OAuth2Strategy } = require('passport-google-oauth');

module.exports = (options, callback) => new OAuth2Strategy(options, callback);
