const { SevenBoom } = require('graphql-apollo-errors');

const { CARD_CREATED_SUB } = require('../constants');

module.exports = async (root, args, ctx) => {

  let {
    title,
    description
  } = args;

  // get viewer
  const { viewer } = ctx;

  // get model
  const { Card } = ctx.db;

  if (!viewer) {
    const errorMessage = `Only authenticated users can create cards`;
    const errorData = { viewer };
    const errorName = 'NOT_ALLOWED';
    const err = SevenBoom.forbidden(errorMessage, errorData, errorName);
    throw err;
  }

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

  const owner = viewer._id

  const card = await Card.createNewCard({
    owner,
    title,
    description
  })

  const { pubsub } = ctx;

  pubsub.publish(CARD_CREATED_SUB, { card });

  return card;

};
