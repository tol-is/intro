let _ = require('lodash')
let make_schema = require('graphql-tools').makeExecutableSchema

let scalar_date = require('./libs/graphql/scalars/date')

// graphql basics
let types         = ''
let queries       = ''
let mutations     = ''
let resolvers     = {}

let card_module       = require('../api/card');

// graphs to join
let modules = {
  Card: card_module
}

_.forOwn(modules, (g, key) => {

  if( g.types ) types += g.types

  if( g.queries ) queries += g.queries

  if( g.mutations ) mutations += g.mutations

  if( g.resolvers ) resolvers = _.merge(resolvers, g.resolvers)

});

let typeDefs = `
 scalar Date

 ${types}

 type Query {
  ${queries}
 }

 type Mutation {
  ${mutations}
 }
`

// manually adding Date scalar to the schema
resolvers.Date = scalar_date

let schema = make_schema({ typeDefs, resolvers })

module.exports.schema = schema
