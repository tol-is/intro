module.exports = db => (user, cb) => {
  cb(null, user.id);
}
