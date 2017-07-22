module.exports = async (root, args, context) => {
  const Model = context.db.model('Card');
  const query = args || {};
  query.deleted = false;
  return await Model.find(query);
};
