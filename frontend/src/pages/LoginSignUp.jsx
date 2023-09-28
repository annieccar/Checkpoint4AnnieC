import { useState, useEffect } from "react";

import SignUp from "../components/SignUp";
import Login from "../components/Login";

export default function LoginSignUp() {
  const [login, setLogIn] = useState(true);
  const [signup, setSignUp] = useState(false);

  const [isMobile, setIsMobile] = useState(true);

  const handleLogIn = () => {
    setLogIn(true);
    setSignUp(false);
  };

  const handleSignUp = () => {
    setLogIn(false);
    setSignUp(true);
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  window.addEventListener("resize", handleResize);

  return (
    <div className="flex flex-col items-center lg:mt-10">
      {isMobile && (
        <div className="flex flex-row justify-center items-center w-full my-10">
          <button
            onClick={() => handleLogIn()}
            type="button"
            className="bg-green font-primary font-bold text-lg text-dark w-24 h-10 mx-10"
          >
            Log in
          </button>
          <p className="font-script text-4xl text-gray">or</p>
          <button
            onClick={() => handleSignUp()}
            type="button"
            className="bg-red font-primary font-bold text-lg text-white w-24 h-10 mx-10"
          >
            Sign Up
          </button>
        </div>
      )}
      {!isMobile && (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center mr-20 pr-20 border-r border-gray">
            <div className="font-script text-gray text-3xl mb-10">
              if you already have an account
            </div>
            <Login />
          </div>
          <div>
            <div className="flex flex-col items-center font-script text-gray text-3xl mb-10">
              If you want to create an account
            </div>
            <SignUp />
          </div>
        </div>
      )}
      {isMobile && signup && (
        <div>
          <SignUp />
        </div>
      )}
      {isMobile && login && (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
