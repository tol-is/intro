let graphqlExpress = require('graphql-server-express').graphqlExpress

module.exports = (app, schema) => {

  app.use('/graphql', graphqlExpress(function(req, res){

    // get query
    const query = req.query.query || req.body.query || {};

    // root value
    let rootValue = {};

    // context
    let context = {
      req: req,
      query: query
    };

    return {
      schema:         schema,
      rootValue:      rootValue,
      context:        context,
      pretty:         true
    };

  }));

}
