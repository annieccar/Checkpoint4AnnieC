const express = require("express");
const checkUserExists = require("../middlewares/checkUserExist");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");
const authControllers = require("../controllers/authControllers");
const validateSchema = require("../middlewares/validateSchema");
const createUserSchema = require("../Validators/CreateUser.validator");

const router = express.Router();

router.post("/login", checkUserExists, authControllers.login);

router.post(
  "/signup",
  validateSchema(createUserSchema),
  checkUserDoesntExists,
  hashPassword,
  authControllers.signUp
);

module.exports = router;
