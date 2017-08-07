module.exports = async (card, args, ctx, parent) => ctx.db.User.loader.load(card.owner);
