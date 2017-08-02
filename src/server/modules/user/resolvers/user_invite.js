const { SevenBoom } = require('graphql-apollo-errors');

const { CARD_CREATED_SUB } = require('../constants');

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

  const { pubsub } = ctx;

  pubsub.publish(CARD_CREATED_SUB, {
    card_created: {
      mutation: 'CARD_CREATE',
      node: card
    }
  });

  return card;

};
