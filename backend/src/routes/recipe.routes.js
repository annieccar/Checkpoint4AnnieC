const express = require("express");

const router = express.Router();

const recipeControllers = require("../controllers/recipeControllers");
const multer = require("../middlewares/multer");
const validateSchema = require("../middlewares/validateSchema");
const createRecipeSchema = require("../Validators/CreateRecipe.validator");

router.get("/", recipeControllers.browse);
router.get("/user/:id", recipeControllers.readByUser);
router.get("/:id", recipeControllers.readOne);
router.post(
  "/",
  multer,
  validateSchema(createRecipeSchema),
  recipeControllers.add
);
router.post("/recipes_has_category", recipeControllers.addCategories);

router.delete("/:id", recipeControllers.deleteOne);

module.exports = router;
