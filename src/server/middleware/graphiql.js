const graphiqlExpress = require('graphql-server-express').graphiqlExpress;

const {
  graphql_subscriptions_url,
  graphql_endpoint
} = require('../config');

module.exports = app => {
  // enable graphiql except for production
  app.use("/graphiql", graphiqlExpress({
    endpointURL : graphql_endpoint,
    subscriptionsEndpoint: graphql_subscriptions_url
  }));

};
