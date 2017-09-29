module.exports = async (root, args, ctx) => {
  const { Card } = ctx.db;
  return await Card.list(args);
};
