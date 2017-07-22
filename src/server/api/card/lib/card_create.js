module.exports = async (root, args, context) => {
  let Card = context.db.model('Card');
  let newCard = new Card(args);
  return await newCard.save();
}
