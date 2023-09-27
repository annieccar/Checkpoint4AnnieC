const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.user.findAll();
    if (rows) {
      res.send(rows);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
};
