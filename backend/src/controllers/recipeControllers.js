const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.recipe.findAll();
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

const readByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await models.recipe.findAllByUser(userId);
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

const readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await models.recipe.find(id);
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
  readByUser,
  readOne,
};
