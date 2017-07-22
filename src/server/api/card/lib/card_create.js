let { SevenBoom } = require( 'graphql-apollo-errors' )

module.exports = async (root, { _id }, context) => {

  let Model = context.db.model('Card');

  let card = await Model.findOne({_id});

  if (!card) {
    const errorMessage = `Card with id: ${_id} not found`;
    const errorData = { _id };
    const errorName = 'CARD_NOT_FOUND';
    const err = SevenBoom.notFound(errorMessage, errorData, errorName);
    throw(err);
  }

  if (card.deleted) {
    const errorMessage = `Card with id: ${_id} is already deleted`;
    const errorData = { _id };
    const errorName = 'CARD_DELETED';
    //methodNotAllowed
    const err = SevenBoom.unauthorized(errorMessage, errorData, errorName);
    throw(err);
  }

  card.deleted = true;
  await card.save();

  return true;
}









module.exports = async (root, args, context) => {

  let Model = context.db.model('Card');
  let card = new Model(args);

  return await card.save();
}
