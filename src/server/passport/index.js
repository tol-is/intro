const passport = require("passport")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const uuid = require('node-uuid')
const google = require("./strategies/google")

const config = require("../config")
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

  // serialize
  passport.serializeUser(db.User.serializeUser);

  // deserialize
  passport.deserializeUser((id, done) => {
    const user = db.User.deserializeUser(id)
    done(user);
  });

  // oauth2 callback for google
  const oauth_callback = require("./callbacks/oauth")(db)
  passport.use(google(config.auth_google, oauth_callback));

}
