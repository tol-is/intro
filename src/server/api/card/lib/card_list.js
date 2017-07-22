module.exports = async (root, args, context) => {
  let Model = context.db.model('Card');
  let query = args || {};
  query.deleted = false;
  return await Model.find(query);
}
