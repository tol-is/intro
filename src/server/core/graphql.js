let graphqlExpress = require('graphql-server-express').graphqlExpress
// let logger = require('minilog')('errors-logger');
// let initSevenBoom = require( 'graphql-apollo-errors' ).initSevenBoom

let graph = require('../api/graph');

// const customArgsDefs = [
//   {
//     name : 'errorCode',
//     order: 1
//   }
// ];

// initSevenBoom(customArgsDefs);

module.exports = (app, db) => {

  let schema = graph.getExecutableSchema();

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

    // const formatErrorOptions = {
    //   logger,
    //   publicDataPath: 'public',
    //   showLocations: true,
    //   showPath: true,
    //   hideSensitiveData: false,
    //   hooks: {
    //     onOriginalError: (originalError) => {logger.info(originalError.message)},
    //     onProcessedError: (processedError) => {logger.info(processedError.message)},
    //     onFinalError: (finalError) => {logger.info(finalError.message)},
    //   }
    // };

    // const formatError = formatErrorGenerator(formatErrorOptions);

    return {
      schema: schema,
      rootValue: rootValue,
      context: context,
      pretty: true
      // formatError: formatError
    };

  }));

}
