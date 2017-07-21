
module.exports.types = `
  type Card {
    _id : ID
    title : String
    description : String
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
`

module.exports.model = require('./model')

module.exports.resolvers = require('./resolvers');
