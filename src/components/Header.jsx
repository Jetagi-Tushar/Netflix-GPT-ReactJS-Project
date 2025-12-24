import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export const Header = ({ isSignin }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log(isSignin);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <header className="header h-16 px-8 flex justify-between items-center">
      <h1 className="logo text-2xl font-bold text-[#f84238]">Netflix-GPT</h1>
      {isSignin && (
        <button className="header-btn border rounded-md border-[#f84238] text-[#f84238] py-1.5 px-4 cursor-pointer">
          Sign In
        </button>
      )}
      {user && (
        <div>
          <span className="text-white mr-4">Hello, {user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="header-btn border rounded-md border-[#f84238] text-[#f84238] py-1.5 px-4 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};
