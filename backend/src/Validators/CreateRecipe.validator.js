const { checkSchema } = require("express-validator");

const createRecipeSchema = checkSchema({
  recipeFile: {
    custom: {
      options: (value, { req }) => {
        if (!req.file) {
          throw new Error("A file is required");
        }
        const allowedMimeTypes = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "application/pdf",
        ];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
          throw new Error("Invalid file type");
        }
        return true;
      },
    },
  },
  title: {
    exists: {
      errorMessage: "An title is required",
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

module.exports = createRecipeSchema;
