const express = require('express');

module.exports = () => {
  // Create express app
  const app = express();

  // mongo connect
  const db = require("./mongo")();

  // Init middlewares
  require('./middleware')(app, db);

  // Init view engine
  require('./view_engine')(app, db);

  // graphql
  require('./graphql')(app, db);

  // Init Routes
  require("./routes")(app, db);

  return app;
};
