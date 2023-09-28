const express = require("express");
const checkUserExists = require("../middlewares/checkUserExist");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/login", checkUserExists, authControllers.login);

module.exports = router;
