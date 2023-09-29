const express = require("express");

const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");
const validateSchema = require("../middlewares/validateSchema");
const createCategorySchema = require("../Validators/CreateCategory.validator");

router.get("/", categoryControllers.browse);
router.get("/user/:id", categoryControllers.readByUser);
router.get("/recipe/:id", categoryControllers.readByRecipe);
router.post("/", validateSchema(createCategorySchema), categoryControllers.add);

module.exports = router;
