let express = require('express');

module.exports = () => {
  // Create express app
  let app = express();

  // mongo connect
  let db = require("./mongo")();

  // Init middlewares
  require('./middleware')(app, db);

  // Init view engine
  require('./view_engine')(app, db);

  // graphql
  require('./graphql')(app, db)

  // Init Routes
  require("./routes")(app, db);

  return app;
};
