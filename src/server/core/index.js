const express = require('express');
const { join } = require('path');

module.exports = () => {
  // Create express app
  const app = express();

  // mongo connect
  const db = require("./mongo")();

  // Init middlewares
  require('./middleware')(app, db);

  // Init view engine
  require('./view_engine')(app, db);

  // Init Routes
  require("./routes")(app, db);

  // Require Mongoose Models
  const models_dir = join(__dirname, '../', 'models');
  require('require-all')({ dirname : models_dir });

  return {
    app,
    db
  };
};
