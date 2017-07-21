let graphiqlExpress = require( 'graphql-server-express' ).graphiqlExpress

module.exports = (app) => {
  // enable graphiql except for production
  app.use("/graphiql", graphiqlExpress({
    endpointURL: "/graphql",
  }));
}
