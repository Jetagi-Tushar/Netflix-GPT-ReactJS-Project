import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setShowGptSearch } from "../utils/gptSlice";

export const Header = ({ isSignin }) => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  const handleGptSearchClick = () => {
    dispatch(setShowGptSearch());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        // Dispatch user info to Redux store
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header
      className="
      fixed top-0 w-full header h-16
      px-4 sm:px-8
      flex flex-col sm:flex-row
      justify-between items-center
    "
    >
      <h1 className="logo text-2xl sm:text-3xl font-bold text-[#f84238]">
        Netflix-GPT
      </h1>

      {isSignin && (
        <button
          className="
          header-btn border rounded-md border-[#f84238]
          text-[#f84238]
          py-1.5 px-4
          text-sm sm:text-base
          cursor-pointer
          mt-2 sm:mt-0
        "
        >
          Sign In
        </button>
      )}

      {user && (
        <div
          className="
          flex items-center gap-3
          mt-2 sm:mt-0
          flex-wrap
        "
        >
          {/* Hide greeting only on very small screens */}
          <span className="hidden sm:inline text-white font-medium text-base sm:text-xl">
            Hello, {user.displayName}
          </span>

          <button
            onClick={handleGptSearchClick}
            className="
            bg-[#f84238] text-white
            px-3 sm:px-4 py-1.5
            rounded-md font-medium
            text-sm sm:text-base
            hover:bg-red-600 transition duration-200
            cursor-pointer
          "
          >
            {showGptSearch ? "Home" : "GPT Picks"}
          </button>

          <button
            onClick={handleSignOut}
            className="
            header-btn border rounded-md border-[#f84238]
            text-[#f84238]
            py-1.5 px-4
            text-sm sm:text-base
            cursor-pointer
          "
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};
