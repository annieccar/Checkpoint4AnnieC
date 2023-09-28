const models = require("../models");

const login = async (req, res) => {
  try {
    const [user] = await models.user.findByEmail(req.body.email);
    delete user[0].password;

    if (user.length !== 0) {
      res.send(user[0]);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// const signUp = () => {
//   console.log("signup");
// };

module.exports = {
  login,
  // signUp,
};
