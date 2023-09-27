const express = require("express");

const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");

router.get("/", categoryControllers.browse);

module.exports = router;
