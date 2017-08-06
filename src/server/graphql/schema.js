const logger = require('minilog')('graphql');

const _ = require('lodash');

const {
  makeExecutableSchema,
  addErrorLoggingToSchema
} = require('graphql-tools');

// require scalar types
const scalar_date = require('./scalars/date');

// require modules
const modules = require('../modules');

// schema shards
let types = '';
let queries = '';
let mutations = '';
let subscriptions = '';
let resolvers = { Date : scalar_date };

// run through modules and construct schema and context
_.forOwn(modules, m => {
  // types
  if (m.types) types += m.types;
  // queries
  if (m.queries) queries += m.queries;
  // mutations
  if (m.mutations) mutations += m.mutations;
  // subscriptions
  if (m.subscriptions) subscriptions += m.subscriptions;
  // resolvers
  if (m.resolvers) resolvers = _.merge(resolvers, m.resolvers);
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

  # Subscriptions
  type Subscription {
    ${ subscriptions }
  }
`;

// Get Executable Schema
const allowUndefinedInResolve = true;
const printErrors = true;

// get Executable Schema
module.exports.getExecutableSchema = () => {
  const executableSchema =  makeExecutableSchema({
    typeDefs,
    resolvers,
    allowUndefinedInResolve,
    printErrors
  });

  addErrorLoggingToSchema(executableSchema, { log: (e) => logger.error(e) });

  return executableSchema;
}
