import React from "react";

export const Header = () => {
  return (
    <header className="header h-16 px-8 flex justify-between items-center">
      <h1 className="logo text-2xl font-bold text-[#f84238]">Netflix-GPT</h1>
      <button className="header-btn border rounded-md border-[#f84238] text-[#f84238] py-1.5 px-4 cursor-pointer">
        Sign In
      </button>
    </header>
  );
};
