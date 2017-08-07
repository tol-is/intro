
const { auth_required } = require("../config")

module.exports = (req, res, next) => {
  if (!req.user && auth_required) {
    return res.sendStatus(401);
  } else {
    next();
  }
};
