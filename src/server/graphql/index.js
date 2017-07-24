const graphqlExpress = require('graphql-server-express').graphqlExpress;

// format Error
const formatError = require('./format_error').formatError();

// get executable schema
const schema = require('./schema').getExecutableSchema();

console.log(schema);

// get database connectors
const db = require('../db');

module.exports = app => {

  // setup middleware
  app.use('/graphql', graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = { viewer : req.user };

    console.log(db);

    // context
    const context = {
      req,
      query,
      db
    };

    // return config
    return {
      schema,
      rootValue,
      context,
      formatError
    };

  }));

};
