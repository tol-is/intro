module.exports = (db) => (req, accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
}
