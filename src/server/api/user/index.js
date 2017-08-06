const {
  user_list,
  user_find_by_id,
  user_invite
} = require('./resolvers');

module.exports.types = `
  type User {
    _id : ID
    email : String,
    name_first : String,
    name_last : String
    created_date : Date
  }
`;

module.exports.root_query = `
  type RootQuery {
    user(id: ID!): User
  }
`;

module.exports.queries = `
  user_list (
    page : Int
  ): [User]

  user_find_by_id (
    _id : String!
  ): User
`;

module.exports.mutations = `
  user_login (
    email : String!,
    password : String!
  ): User

  user_invite (
    email : String!
  ): User
`;

module.exports.resolvers = {

  Query : {
    user_list,
    user_find_by_id
  },

  Mutation : {
    user_invite
  }

};
