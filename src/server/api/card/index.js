
const { withFilter } = require('graphql-subscriptions');

const {
  owner,
  card_find_by_id,
  card_list,
  card_create,
  card_delete,
  card_created,
} = require('./resolvers');

const db = require('../../db');

// pubsub
const pubsub = require('../../graphql/pubsub');

const { CARD_CREATED_SUB } = require('./constants');

module.exports.types = `
  type Card {
    _id : ID
    owner : User
    title : String
    description : String
    deleted : Boolean
    created_date : Date
  }
`;

module.exports.queries = `
  card_list : [Card]

  card_find_by_id (
    _id : String!
  ): Card
`;

module.exports.mutations = `
  card_create (
    title : String!
    description : String!
  ): Card

  card_delete (
    _id : String!
  ): Boolean
`;

// Subscriptions
module.exports.subscriptions = `
  card_created (
    _id: String
  ) : Card
`;

// Prop Resolvers
const Card = {
  owner
};

// Query Resolvers
const Query = {
  card_list,
  card_find_by_id
}

// Mutation Resolvers
const Mutation = {
  card_create,
  card_delete
};

// Subscription Resolvers
const Subscription = {
  card_created: {
    resolve: card_created,
    subscribe: () => pubsub.asyncIterator(CARD_CREATED_SUB)
    // subscribe: withFilter(() => pubsub.asyncIterator(CARD_CREATED_SUB), (payload, args) => true)
  }
};

// Export Resolvers
module.exports.resolvers = {
  Card,
  Query,
  Mutation,
  Subscription
};
