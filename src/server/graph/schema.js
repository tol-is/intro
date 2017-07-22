const _ = require('lodash');
const make_schema = require('graphql-tools').makeExecutableSchema;

const scalar_date = require('./scalars/date');

const Card = require('./card');

// graphql basics
let types = '';
let queries = '';
let mutations = '';
let resolvers = { Date : scalar_date };

// graphs to join
const modules = { Card };

_.forOwn(modules, g => {

  if (g.types) types += g.types;

  if (g.queries) queries += g.queries;

  if (g.mutations) mutations += g.mutations;

  if (g.resolvers) resolvers = _.merge(resolvers, g.resolvers);

});

const typeDefs = `
 scalar Date

 ${ types }

 type Query {
  ${ queries }
 }

 type Mutation {
  ${ mutations }
 }
`;

module.exports.getExecutableSchema = () => make_schema({
  typeDefs,
  resolvers
});

