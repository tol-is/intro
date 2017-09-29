const graphqlExpress = require('graphql-server-express').graphqlExpress;

// ensure authenticated middleware
const ensureAuthenticated = require('../middleware/ensure_authenticated');

// format Error
const formatError = require('../apollo/format_error').formatError();

// get executable schema
const schema = require('../apollo/schema');

// subscriptions
const addSubscriptions = require('../apollo/subscriptions');

// pubsub
const pubsub = require('../apollo/pubsub');

// get database connectors
const db = require('../api/db');

const { graphql_endpoint } = require('../config');

module.exports = (app, ws_server) => {

  // user graphqlExpress middleware with ensure authenticated
  app.use(`/${ graphql_endpoint }`, ensureAuthenticated, graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = {
      req,
      query
    };

    // viewer
    const viewer = req.user;


    // context
    const context = {
      viewer,
      db,
      pubsub
    };

    // return config
    return {
      schema,
      rootValue,
      context,
      formatError
    };

  }));

  // Add Subscriptions
  addSubscriptions({
    ws_server,
    schema,
    db
  });

};
