const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

// const config = require('../config');
// const pubsub = require('./pubsub');

const { graphql_subscriptions_endpoint } = require('../config');

module.exports = ({ ws_server, schema, db }) => {
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
    // onConnect: () => {
    //   console.log('on connect', arguments);
    // }
    // ,
    // onOperation: (msg, params, socket) => {
    //   console.log(socket);
    // }
  },
  {
    server : ws_server,
    path   : `/${ graphql_subscriptions_endpoint }`
  });

  return subscriptionServer;

};
