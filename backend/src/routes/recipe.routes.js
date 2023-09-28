const express = require("express");

const router = express.Router();

const recipeControllers = require("../controllers/recipeControllers");

router.get("/", recipeControllers.browse);
router.get("/user/:id", recipeControllers.readByUser);
router.get("/:id", recipeControllers.readOne);

module.exports = router;
