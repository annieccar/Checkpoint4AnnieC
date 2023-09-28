const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.category.findAll();
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
    const [rows] = await models.category.findAllByUser(userId);
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

const readByRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const [rows] = await models.category.findAllByRecipe(recipeId);
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
  readByRecipe,
};
