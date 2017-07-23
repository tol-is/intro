
module.exports = (db) => (id, done) => {
  done(null, { _id: id });
}
