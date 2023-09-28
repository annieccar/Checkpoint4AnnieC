const express = require("express");

const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");

router.get("/", categoryControllers.browse);
router.get("/user/:id", categoryControllers.readByUser);
router.get("/recipe/:id", categoryControllers.readByRecipe);

module.exports = router;
