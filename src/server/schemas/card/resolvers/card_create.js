const { SevenBoom } = require('graphql-apollo-errors');

module.exports = async (root, args, ctx) => {

  let {
    title,
    description
  } = args;

  // get model
  const { Card } = ctx.db;

  if (!title) {
    const errorMessage = `Validation Failed - Invalid Card Title`;
    const errorData = { title };
    const errorName = 'INVALID_CARD_TITLE';
    const err = SevenBoom.badRequest(errorMessage, errorData, errorName);
    throw err;
  }

  if (!description) {
    const errorMessage = `Validation Failed - Invalid Card Description`;
    const errorData = { description };
    const errorName = 'INVALID_CARD_DESCRIPTION';
    const err = SevenBoom.badRequest(errorMessage, errorData, errorName);
    throw err;
  }

  const card = await Card.createNewCard({
    title,
    description
  })

  return card;

};
