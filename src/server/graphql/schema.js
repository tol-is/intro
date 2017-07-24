const _ = require('lodash');
const make_schema = require('graphql-tools').makeExecutableSchema;

// require scalar types
const scalar_date = require('./scalars/date');

// require schemas
const schemas = require('../schemas');

// schema components
let types = '';
let queries = '';
let mutations = '';
let resolvers = { Date : scalar_date };

// graphs to join
_.forOwn(schemas, schema => {
  // types
  if (schema.types) types += schema.types;
  // queries
  if (schema.queries) queries += schema.queries;
  // mutations
  if (schema.mutations) mutations += schema.mutations;
  // resolvers
  if (schema.resolvers) resolvers = _.merge(resolvers, schema.resolvers);
});

// Construct type definitions with string literal
const typeDefs = `
  # Date
  scalar Date

  # Types
  ${ types }

  # Queries
  type Query {
    ${ queries }
  }

  # Mutations
  type Mutation {
    ${ mutations }
  }
`;

// Get Executable Schema
const allowUndefinedInResolve = true;
const printErrors = true;
module.exports.getExecutableSchema = () => make_schema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve,
  printErrors
});
