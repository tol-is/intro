module.exports.model = require('./model')

module.exports.types = `
  type Card {
    _id : ID
    title : String
    description : String
    deleted : Boolean
    created_date : Date
  }
`

module.exports.queries = `
  card_list (
    page : Int
  ): [Card]

  card_find (
    _id : String!
  ): Card
`

module.exports.mutations = `
  card_create (
    title : String!
    description : String!
  ): Card

  card_delete (
    _id : String!
  ): Boolean
`

module.exports.resolvers = require('./resolvers');
