const models = require("../models");

const checkUserDoesntExists = async (req, res, next) => {
  const [user] = await models.user.findByEmail(req.body.email);

  if (user.length !== 0) {
    return res.status(400).json({ message: "user already exist" });
  }

  return next();
};

module.exports = checkUserDoesntExists;
