const config = require("../config");

module.exports = (app, ws_server) => {

  // Graphql Express
  require("./graphql")(app, ws_server);

  // Handle health check routes
  require("./health")(app);

  // auth
  require("./auth/google")(app);

  // graphiql
  if (config.development)
    require('./graphiql')(app);

  // html render (/* must be last)
  require("./client")(app);
};
