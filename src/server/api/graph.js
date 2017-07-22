let _ = require('lodash')
let make_schema = require('graphql-tools').makeExecutableSchema

let scalar_date = require('./scalars/date')

// graphql basics
let types         = ''
let queries       = ''
let mutations     = ''
let resolvers     = {
  Date: scalar_date
}

// graphs to join
let modules = {
  Card: require('./card')
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

module.exports.getExecutableSchema = () => {
  return make_schema({ typeDefs, resolvers })
}

