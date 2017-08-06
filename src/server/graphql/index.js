const graphqlExpress = require('graphql-server-express').graphqlExpress;

// format Error
const ensureAuthenticated = require('../middleware/ensure_authenticated');

// format Error
const formatError = require('./format_error').formatError();

// get executable schema
const schema = require('./schema').getExecutableSchema();

// get loaders
const loaders = require('./schema').getLoaders();

// subscriptions
const addSubscriptions = require('./subscriptions');

// pubsub
const pubsub = require('./pubsub');

// get database connectors
const db = require('../db');

module.exports = (app, ws_server) => {

  // setup middleware
  app.use('/graph', ensureAuthenticated, graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = {};

    // viewer
    const viewer = req.user;

    // context
    const context = {
      viewer,
      db,
      loaders,
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
  const subse = addSubscriptions({
    ws_server,
    schema,
    db
  });

};
