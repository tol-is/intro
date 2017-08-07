const {
  user_list,
  user_find_by_id,
} = require('./resolvers');

module.exports.types = `
  type User {
    _id : ID
    email : String
    name_first : String
    name_last : String
    created_date : Date
  }
`;

module.exports.queries = `
  user_list : [User]

  user_find_by_id (
    _id : String!
  ): User
`;

module.exports.mutations = ``;

module.exports.resolvers = {

  Query : {
    user_list,
    user_find_by_id
  }

};
