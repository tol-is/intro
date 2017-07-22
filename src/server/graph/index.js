const graphqlExpress = require('graphql-server-express').graphqlExpress;
const logger = require('minilog')('graphql');
const apolloErrors = require('graphql-apollo-errors');

const {
  formatErrorGenerator,
  initSevenBoom
} = apolloErrors;

const graph = require('./schema');

module.exports = (app, db) => {

  // Seven Boom Args
  const sevenBoomArgs = [
    {
      name  : 'errorName',
      order : 1
    }
  ];
  initSevenBoom(sevenBoomArgs);

  // get executable schema
  const schema = graph.getExecutableSchema();

  // setup middleware
  app.use('/graphql', graphqlExpress(req => {

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    const rootValue = {};

    // context
    const context = {
      req,
      query,
      db
    };

    // format error
    const formatError = formatErrorGenerator({
      logger,
      hooks: {
        onOriginalError: e => {
          logger.warn(e.message);
        },
      }
    });

    // return config
    return {
      schema,
      rootValue,
      context,
      formatError
    };

  }));

};
