const graphiqlExpress = require('graphql-server-express').graphiqlExpress;

const ensureAuthenticated = require('./ensure_authenticated');

const {
  graphql_subscriptions_url,
  graphql_endpoint
} = require('../config');

module.exports = app => {
  // enable graphiql except for production
  app.use("/graphiql", ensureAuthenticated, graphiqlExpress({
    endpointURL : graphql_endpoint,
    subscriptionsEndpoint: graphql_subscriptions_url
  }));

};
