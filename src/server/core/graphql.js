let graphqlExpress = require('graphql-server-express').graphqlExpress
let logger = require('minilog')('graphql');
let apolloErrors = require( 'graphql-apollo-errors' )

let {
  formatErrorGenerator,
  initSevenBoom } = apolloErrors;

let graph = require('../api/graph');

module.exports = (app, db) => {

  // Seven Boom Args
  const sevenBoomArgs = [
    {
      name : 'errorName',
      order: 1
    }
  ];
  initSevenBoom(sevenBoomArgs);

  // get executable schema
  let schema = graph.getExecutableSchema();

  // setup middleware
  app.use('/graphql', graphqlExpress(function(req, res){

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    let rootValue = {};

    // context
    let context = {
      req: req,
      query: query,
      db: db
    };

    // format error
    const formatError = formatErrorGenerator({
      logger,
      hooks : {
        onOriginalError: (e) => {logger.warn(e.message)},
      }
    });

    // return config
    return {
      schema: schema,
      rootValue: rootValue,
      context: context,
      formatError: formatError
    };

  }));

}
