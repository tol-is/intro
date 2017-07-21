let config = require("../config");
let path = require("path");

module.exports = (app, schema) => {

	// Handle health check routes
	require("./health")(app);

	// graphql
  // require("./graphql")(app, schema);
	require("./graphql_express")(app, schema);

  //graphiql
  if (config.development) {
    require("./graphiql")(app);
  }

  require("./client")(app);

};
