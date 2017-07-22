const express = require('express');

module.exports = () => {
  // Create express app
  const app = express();

  // mongo connect
  const db = require("./mongo")();

  // Init middlewares
  require('./middleware')(app);

  // Init view engine
  require('./view_engine')(app);

  // Init Routes
  require("./routes")(app);

  // return
  return {
    app,
    db
  };
};
