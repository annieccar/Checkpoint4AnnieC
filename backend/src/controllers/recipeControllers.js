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

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.recipe.delete(id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const recipe = req.body;
    const { filename } = req.file;
    recipe.fileName = filename;

    const [result] = await models.recipe.insert(recipe);
    if (result.affectedRows) {
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addCategories = async (req, res) => {
  const { recipeId } = req.body;
  const { categories } = req.body;

  const results = [];
  for (const categoryId of categories) {
    try {
      const [result] = await models.recipe.insertCategory({
        recipeId,
        categoryId,
      });

      if (result.affectedRows) {
        results.push({ id: result.insertId });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  if (results.length > 0) {
    res.status(201).json(results);
  } else {
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  readByUser,
  readOne,
  deleteOne,
  add,
  addCategories,
};
