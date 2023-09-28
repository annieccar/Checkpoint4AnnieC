const express = require("express");

const router = express.Router();

const usersRoutes = require("./routes/users.routes");
const recipeRoutes = require("./routes/recipe.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");

router.use("/users", usersRoutes);
router.use("/recipes", recipeRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);

module.exports = router;
