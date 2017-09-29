module.exports = async (root, args, ctx) => {
  // get data connector
  const { User } = ctx.db;
  // find cards
  return await User.list();
};
