module.exports = async (root, args, context) => {
  let Card = context.db.model('Card');
  let query = args || {};
  return await Card.find(query);
}
