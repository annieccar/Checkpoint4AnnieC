import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginSignUp from "../pages/LoginSignUp";
import MyRecipes from "../pages/MyRecipes";
import Recipe from "../pages/Recipe";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<LoginSignUp />} />
      <Route path="/myrecipes" element={<MyRecipes />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default Router;
