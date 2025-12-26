import React, { use } from "react";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignin, setIsSignin] = React.useState(true);
  const [errmsg, setErrmsg] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignin(!isSignin);
  };

  const name = React.useRef(null);
  const email = React.useRef(null);
  const password = React.useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const msg = checkValidData(email.current.value, password.current.value);
    setErrmsg(msg);

    if (msg) return;
    // Proceed with sign-in or sign-up logic here
    if (!isSignin) {
      // Sign-up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrmsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrmsg(errorMessage, errorCode);
        });
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrmsg(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header isSignin={isSignin} />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <form
          className="
          w-full max-w-md
          p-6 sm:p-8
          bg-[rgba(2,6,23,0.85)]
          border rounded-2xl
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
        "
        >
          <h2 className="mb-6 text-lg sm:text-xl text-center">
            {isSignin ? "Login to Netflix-GPT" : "Register to Netflix-GPT"}
          </h2>

          {!isSignin && (
            <input
              ref={name}
              className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb] text-sm sm:text-base"
              type="text"
              placeholder="Full Name"
            />
          )}

          <input
            ref={email}
            className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb] text-sm sm:text-base"
            type="email"
            placeholder="Email Address"
          />

          <input
            ref={password}
            className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb] text-sm sm:text-base"
            type="password"
            placeholder="Password"
          />

          <p className="text-red-500 text-xs sm:text-sm mb-1.5">{errmsg}</p>

          <button
            onClick={handleButtonClick}
            className="
            w-full p-3
            border-none rounded-lg
            mt-2 cursor-pointer
            font-semibold text-[#fefefe]
            bg-[#f84238]
            text-sm sm:text-base
          "
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-[#94a3b8] mt-5 text-xs sm:text-sm text-center">
            {isSignin ? "New to Netflix-GPT?" : "Already have an account?"}
            <span
              onClick={toggleSignIn}
              className="text-[#f84238] cursor-pointer"
            >
              {isSignin ? " Create account" : " Sign in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
