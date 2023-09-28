const models = require("../models");
const { verifyPassword } = require("../helpers/argon2Helper");

const login = async (req, res) => {
  try {
    const isVerified = await verifyPassword(
      req.user.password,
      req.body.password
    );
    if (isVerified) {
      delete req.user.password;
      res.status(200).json(req.user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, hashedPassword } = req.body;

    const [result] = await models.user.insert({
      username,
      email,
      hashedPassword,
    });

    if (result.affectedRows) {
      delete req.body.hashedPassword;
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  login,
  signUp,
};
