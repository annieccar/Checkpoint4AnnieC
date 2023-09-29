const { checkSchema } = require("express-validator");

const createCategorySchema = checkSchema({
  name: {
    exists: {
      errorMessage: "An name is required",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 3, max: 64 },
      errorMessage: "Your title must contain between 3 and 64 characters",
    },
  },
  userId: {
    exists: {
      errorMessage: "A userId is required",
      options: {
        checkFalsy: true,
      },
    },
    isNumeric: {
      errorMessage: "Your user type Id must be numeric",
    },
  },
});

module.exports = createCategorySchema;
