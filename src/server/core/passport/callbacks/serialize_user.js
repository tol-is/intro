
module.exports = (db) => (user, done) => {
  done(null, user.id);
}
