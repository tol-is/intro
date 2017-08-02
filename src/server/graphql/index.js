const graphqlExpress = require('graphql-server-express').graphqlExpress;

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
  app.use('/graph', graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = {};

    // root value
    // const viewer = req.user;
    const viewer= {
      _id : "5973f6023ca74c5f2c788daf",
      email : "ac@ap-o.com",
      name_first : "Apostolos",
      name_last : "Christodoulou",
    };

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
