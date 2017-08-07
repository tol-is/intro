module.exports = async (root, args, ctx) => {

  // get model
  const { User } = ctx.db;

  // find cards
  return await User.list();
};
