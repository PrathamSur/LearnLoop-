import React from "react";
import LDropdown from "./LDropdown";

const LHeader = () => {
  return (
    <div className="bg-[#F2F4F5] h-full flex justify-center items-center md:h-[18%] lg:h-[25%] p-4 lg:p-6">
      <div className="bg-white px-5 py-3 h-full w-[90%] p-2 rounded-full flex  justify-between items-center border border-neutral-300 shadow-sm">
        <h1 className="text-xl font-bold lg:text-2xl md:text-2xl">LearnLoop</h1>
        <div className="hidden lg:flex lg:gap-2 lg:text-lg lg:font-semibold">
          <a
            href="/login"
            className="text-white bg-black hover:text-black transition duration-300 hover:bg-neutral-50 border border-neutral-900 p-2 rounded-full px-3"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-black hover:text-white transition duration-300 hover:bg-black border border-neutral-900 p-2 rounded-full px-3"
          >
            Sign Up
          </a>
        </div>

        <LDropdown />
      </div>
    </div>
  );
};

export default LHeader;
