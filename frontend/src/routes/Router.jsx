import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginSignUp from "../pages/LoginSignUp";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<LoginSignUp />} />
    </Routes>
  );
}

export default Router;
