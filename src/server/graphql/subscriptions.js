const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

module.exports = (server, schema) => {

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect: () => {
      console.log('on connect')
    },
    onOperation: (msg, params, socket) => {
      console.log('on operation')
    }
  },
  {
    server: server,
    path: '/graphql',
  });

  return subscriptionServer;

}
