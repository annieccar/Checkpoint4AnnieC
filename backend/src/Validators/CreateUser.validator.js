const { checkSchema } = require("express-validator");

const createUserSchema = checkSchema({
  username: {
    exists: {
      errorMessage: "A username is required",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 3, max: 64 },
      errorMessage: "Your user name must have between 3 and 64 characters",
    },
  },
  email: {
    exists: {
      errorMessage: "An email is required",
      options: {
        checkFalsy: true,
      },
    },
    isEmail: {
      errorMessage: "Your must enter a valid email address",
    },
  },
  password: {
    exists: {
      errorMessage: "A password is required",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 8, max: 64 },
      errorMessage: "Your password must contain between 8 and 64 characters",
    },
  },
});

module.exports = createUserSchema;
