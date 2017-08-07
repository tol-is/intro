const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('node-uuid');
const google = require("./strategies/google");

const config = require("../config");

const deserialize_user = require("./callbacks/deserialize_user");
const serialize_user = require("./callbacks/serialize_user");
const oauth_callback = require("./callbacks/oauth");

module.exports = (app, mongooseConnection) => {

  // create mongo store
  const store = new MongoStore({
    mongooseConnection,
    collection    : config.session.collection,
    autoReconnect : true
  });

  // use session middleware
  const genid = () => uuid.v4();
  const secret = config.session.secret;
  const resave = false;
  const saveUninitialized = true;

  app.use(session({
    store,
    genid,
    secret,
    resave,
    saveUninitialized
  }));

  // initialize passport
  app.use(passport.initialize());

  // user passport session middleware
  app.use(passport.session());

  // serialize/deserialize
  passport.serializeUser(serialize_user);
  passport.deserializeUser(deserialize_user);

  // oauth2 callback for google
  passport.use(google(config.auth_google, oauth_callback));

};
