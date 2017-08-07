const { PubSub } = require('graphql-subscriptions');
const { addApolloLogging } = require('apollo-logger');

const config = require('../config');

// pubsub
const pb = new PubSub();
const pubsub = config.development ? addApolloLogging(pb) : pb;

module.exports = pubsub;
