const { PubSub } = require('graphql-subscriptions');
const { addApolloLogging } = require('apollo-logger') ;

const config = require('../config');

// pubsub
const pubsub = config.development ? addApolloLogging(new PubSub()) : new PubSub();

module.exports = pubsub;
