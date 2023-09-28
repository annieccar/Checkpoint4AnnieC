const express = require("express");
const checkUserExists = require("../middlewares/checkUserExist");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/login", checkUserExists, authControllers.login);

router.post(
  "/signup",
  checkUserDoesntExists,
  hashPassword,
  authControllers.signUp
);

module.exports = router;
