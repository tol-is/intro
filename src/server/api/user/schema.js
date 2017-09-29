const { join } = require('path');

module.exports.types = `
  type User {
    _id : ID
    email : String
    name_first : String
    name_last : String
  }
`;

module.exports.queries = `
  user_list : [User]

  user_find_by_id (
    _id : String!
  ): User
`;

const Query = require('require-all')(join(__dirname, "/queries"));

// Export Resolvers
module.exports.resolvers = { Query };
