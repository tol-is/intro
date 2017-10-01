const { join } = require('path');
const owner = require('../_shared/resolvers/owner');

module.exports.types = `
  type Card {
    _id : ID
    owner : User
    owner_id : String
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


const Card = { owner };
const Query = require('require-all')(join(__dirname, "/queries"));
const Mutation = require('require-all')(join(__dirname, "/mutations"));
const Subscription = require('require-all')(join(__dirname, "/subscriptions"));

// Export Resolvers
module.exports.resolvers = {
  Card,
  Query,
  Mutation,
  Subscription
};
