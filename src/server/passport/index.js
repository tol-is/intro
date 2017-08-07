const passport = require("passport")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const uuid = require('node-uuid')
const google = require("./strategies/google")

const config = require("../config")

const deserialize_user = require("./callbacks/deserialize_user");
const serialize_user = require("./callbacks/serialize_user");
const oauth_callback = require("./callbacks/oauth");
const db = require('../db');

module.exports = (app, mongooseConnection) => {

  // create mongo store
  const store = new MongoStore({
    mongooseConnection: mongooseConnection,
    collection: config.session.collection,
    autoReconnect: true
  });

  // use session middleware
  app.use(session({
    store: store,
    genid: req => uuid.v4(),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
  }));

  // initialize passport
  app.use(passport.initialize())

  // user passport session middleware
  app.use(passport.session())

  // serialize/deserialize
  passport.serializeUser(serialize_user);
  passport.deserializeUser(deserialize_user);

  // oauth2 callback for google
  if (config.auth_google.enabled)
    passport.use(google(config.auth_google, oauth_callback));

}
