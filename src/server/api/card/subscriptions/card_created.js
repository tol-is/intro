const { withFilter } = require('graphql-subscriptions');

// pubsub
const pubsub = require('../../../apollo/pubsub');
const { CARD_CREATED_SUB } = require('../constants');

module.exports = {
  resolve   : async (payload, args, ctx) => payload.card,
  subscribe : withFilter(() => pubsub.asyncIterator(CARD_CREATED_SUB), (payload, args) => true)
};
