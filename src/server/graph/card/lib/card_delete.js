const { SevenBoom } = require('graphql-apollo-errors');

module.exports = async (root, { _id }, context) => {

  // get card
  const Model = context.db.model('Card');
  const card = await Model.findOne({ _id });

  // if not found throw 404
  if (!card) {
    const errorMessage = `Card with id: ${ _id } not found`;
    const errorData = { _id };
    const errorName = 'CARD_NOT_FOUND';
    const err = SevenBoom.notFound(errorMessage, errorData, errorName);
    throw err;
  }

  // if already deleted throw 403
  if (card.deleted) {
    const errorMessage = `Card with id: ${ _id } is already deleted`;
    const errorData = { _id };
    const errorName = 'CARD_DELETED';
    const err = SevenBoom.forbidden(errorMessage, errorData, errorName);
    throw err;
  }

  // set card deleted
  card.deleted = true;
  await card.save();

  // return true
  return true;
};
