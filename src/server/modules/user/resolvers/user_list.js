module.exports = async (root, args, ctx) => {

  // get model
  const { Card } = ctx.db;

  // find cards
  return await Card.listCards(args);
};
