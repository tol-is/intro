let express = require('express');

let schema = require( './graphql' ).schema

module.exports = () => {
  // Create express app
  let app = express();

  // mongo connect
  let db = require("./mongo")();

  // Init middlewares
  require('./middleware')(app);

  // Init view engine
  require('./view_engine')(app);

  // Init Helmet security headers
  require('./helmet')(app);

  // Init Routes
  require("../routes")(app, schema);

  return app;
};
