const card_list = require('./lib/card_list');
const card_find = require('./lib/card_find');
const card_create = require('./lib/card_create');
const card_delete = require('./lib/card_delete');

module.exports.types = `
  type Card {
    _id : ID
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

  card_find (
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

module.exports.resolvers = {

  Card : {},

  Query : {
    card_list,
    card_find
  },

  Mutation : {
    card_create,
    card_delete
  }

};
