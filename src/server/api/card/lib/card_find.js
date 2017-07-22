module.exports = async (root, { _id }, context) => {
  let Card = context.db.model('Card');
  return await Card.findOne({_id});
}
