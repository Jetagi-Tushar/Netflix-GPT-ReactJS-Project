import React from "react";
import { Header } from "./Header";

const Login = () => {
  const [isSignin, setIsSignin] = React.useState(true);

  const toggleSignIn = () => {
    setIsSignin(!isSignin);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <form className="w-85 p-8 bg-[rgba(2,6,23,0.85)] border rounded-2xl shadow-[0 20px 40px rgba(0,0,0,0.6)]">
          <h2 className="mb-7 text-xl text-center">
            {isSignin ? "Login to Netflix-GPT" : "Register to Netflix-GPT"}
          </h2>

          {!isSignin && (
            <input
              className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb]"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb]"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="w-full p-3 mb-3.5 bg-[#020617] border rounded-md text-[#e5e7eb]"
            type="password"
            placeholder="Password"
          />
          <button className="w-full p-3 border-none rounded-lg mt-2 cursor-pointer font-semibold text-[#fefefe] bg-[#f84238]">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-[#94a3b8] mt-5 text-sm">
            New here?{" "}
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
