module.exports = async (card, args, ctx, parent) => {
  return ctx.db.User.loader.load(card.owner);
}
