const express = require("express");

const router = express.Router();

const recipeControllers = require("../controllers/recipeControllers");

router.get("/", recipeControllers.browse);

module.exports = router;
