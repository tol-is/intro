let { SevenBoom } = require( 'graphql-apollo-errors' )

module.exports = async (root, { _id }, context) => {

  let Model = context.db.model('Card');
  let result = await Model.findOne({_id});

  if (result) return result;

  const errorMessage = `Card with id: ${_id} not found`;
  const errorData = { _id };
  const errorName = 'CARD_NOT_FOUND';
  const err = SevenBoom.notFound(errorMessage, errorData, errorName);
  throw(err);
}
