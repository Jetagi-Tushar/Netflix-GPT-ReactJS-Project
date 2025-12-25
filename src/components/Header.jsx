import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Header = ({ isSignin }) => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
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
      className={`fixed top-0 w-full header h-16 px-8 flex justify-between items-center
        `}
    >
      <h1 className="logo text-3xl font-bold text-[#f84238]">Netflix-GPT</h1>
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
