module.exports = async (card, args, ctx, parent) => {
  return ctx.db.User.userLoader.load(card.owner);
}
