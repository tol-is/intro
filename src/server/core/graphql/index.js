const graphqlExpress = require('graphql-server-express').graphqlExpress;

// format Error
const formatError = require('./format_error').formatError();

// get executable schema
const schema = require('./schema').getExecutableSchema();

module.exports = (app, db, models) => {

  // setup middleware
  app.use('/graphql', graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = { viewer : req.user };

    // context
    const context = {
      req,
      query,
      db,
      models
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
