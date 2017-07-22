const express = require('express');

module.exports = () => {
  // Create express app
  const app = express();

  // mongo connect
  const { db, models } = require("./mongoose")();

  // Init middlewares
  require('./middleware')(app);

  // Init view engine
  require('./view_engine')(app);

  // Init Routes
  require("./routes")(app);

  // init graph
  require("./graphql")(app, db, models);

  // return
  return {
    app,
    db
  };
};
