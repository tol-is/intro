module.exports = async (root, args, ctx, parent) => ctx.db.User.loader.load(root.owner_id);
