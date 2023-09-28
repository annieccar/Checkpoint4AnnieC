import { Link } from "react-router-dom";

import logo from "../assets/images/logo-no-background.svg";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center h-14 bg-red">
      <Link to="/">
        <img className="h-9 pl-5" src={logo} alt="MyKitchen Logo" />
      </Link>
      <Link to="/signup">
        <div className="font-primary text-green text-xl pr-5">Log In</div>
      </Link>
    </div>
  );
}
