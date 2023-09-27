import { useState } from "react";

import SignUp from "../components/SignUp";
import Login from "../components/Login";

export default function LoginSignUp() {
  const [login, setLogIn] = useState(true);
  const [signup, setSignUp] = useState(false);

  const handleLogIn = () => {
    setLogIn(true);
    setSignUp(false);
  };

  const handleSignUp = () => {
    setLogIn(false);
    setSignUp(true);
  };

  return (
    <div className="flex flex-col items-center">
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
      {signup && (
        <div>
          <SignUp />
        </div>
      )}
      {login && (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
