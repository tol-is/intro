const logger = require('minilog')('card gql');

module.exports = async (root, args, ctx) => {

  // get model
  const Card = ctx.db.model('Card');

  // make query
  const query = args || {};
  query.deleted = false;

  // find cards
  return await Card.find(query);
};
