module.exports = (db) => (id, cb) => {
  const User = db.model('User');
  User.findById(id).exec((err, user) => {
    cb(err, user);
  });
}
