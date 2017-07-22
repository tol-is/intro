const {
  card_list,
  card_find,
  card_create,
  card_delete
} = require('./resolvers');

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
