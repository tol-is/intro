const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const uuid = require('node-uuid')

const config = require('../../config');

module.exports = function(app, db) {

  const store = new MongoStore({
    mongooseConnection: db,
    collection: config.session.collection,
    autoReconnect: true
  });

  app.use(session({
    store: store,
    genid: req => uuid.v4(),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
  }));

}
