var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

var config = require("../../../config")

module.exports = (options, callback) => new GoogleStrategy(options, callback);
