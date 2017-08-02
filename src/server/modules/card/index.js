const DataLoader = require('dataloader');

const { withFilter } = require('graphql-subscriptions');

const {
  card_list,
  card_find_by_id,
  card_created,
  card_create,
  card_delete
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
  card_list (
    page : Int
  ): [Card]

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

// Loaders
module.exports.loaders = {
  getCardOwner : new DataLoader(db.User.findUsersByIds)
}


// Prop Resolvers
const Card = {
  owner: function(card, args, ctx, parent){
    return ctx.loaders.getCardOwner.load(card.owner);
  }
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
    resolve: (payload, args, ctx) => {
      return payload.card;
    },
    // subscribe: () => pubsub.asyncIterator(CARD_CREATED_SUB)
    subscribe: withFilter(() => pubsub.asyncIterator(CARD_CREATED_SUB), (payload, args) => true)
  }
};

// Export Resolvers
module.exports.resolvers = {
  Card,
  Query,
  Mutation,
  Subscription
};
