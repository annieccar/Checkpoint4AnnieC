import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import logo from "../assets/images/logo-no-background.svg";
import { useCurrentUserContext } from "../contexts/currentUserContext";

export default function NavBar() {
  const { user, setUser } = useCurrentUserContext();
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
    setUserMenu(false);
  };

  return (
    <div className="flex justify-between items-center h-14 bg-red">
      <Link to="/">
        <img className="h-9 pl-5" src={logo} alt="MyKitchen Logo" />
      </Link>
      <div className="relative">
        {user ? (
          <>
            <button
              type="button"
              onClick={() => setUserMenu(true)}
              className="font-primary text-green text-xl pr-5"
            >
              {user.user_name}
            </button>
            {userMenu && (
              <>
                <button type="button" onClick={() => setUserMenu(false)}>
                  <div className="fixed z-0 top-0 bottom-0 left-0 right-0" />
                </button>
                <div className="absolute bg-lightgray rounded-md flex flex-col items-start justify-around min-h-[80px] min-w-[120px] px-3 -translate-x-8 translate-y-4 border-solid border-gray border-[1px]">
                  <Link to="/myrecipes">
                    <div className="text-gray font-primary font-semibold hover:text-red">
                      My Recipes
                    </div>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    type="button"
                    className="text-gray font-primary font-semibold hover:text-red"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <Link to="/signup">
            <div className="font-primary text-green text-xl pr-5">Log In</div>
          </Link>
        )}
      </div>
    </div>
  );
}
