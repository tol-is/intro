const { SevenBoom } = require('graphql-apollo-errors');

module.exports = async (root, { _id }, ctx) => {
  // get data connector
  const { User } = ctx.db;
  // find user
  const result = await User.findById({ _id });
  // return if found
  if (result) return result;

  // throw 404
  const errorMessage = `User with id: ${ _id } not found`;
  const errorData = { _id };
  const errorName = 'USER_NOT_FOUND';
  const err = SevenBoom.notFound(errorMessage, errorData, errorName);
  throw err;
};
