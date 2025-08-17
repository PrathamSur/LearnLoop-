import React from "react";
import LDropdown from "./LDropdown";
import Content from "./Content";


const Header = () => {
  return (
    <div className="bg-[#F2F4F5] h-full flex justify-center items-center md:h-[18%] lg:h-[25%] p-4 lg:p-6">
      <div className="bg-white px-5 py-3 h-full w-[90%] p-2 rounded-full flex  justify-between items-center border border-neutral-300 shadow-sm">
        <div className="flex items-center h-full w-[40%] md:w-[30%] lg:w-[20%]">
          <img src="/LL-logo2.png" alt="Logo" className="h-full object-contain rounded-full" />
        </div>
        

        <div className="hidden lg:flex lg:gap-2 lg:text-lg lg:font-semibold">
          <a
            href="/profile"
            className="text-white bg-black hover:text-black transition duration-300 hover:bg-neutral-50 border border-neutral-900 p-2 rounded-full px-3"
          >
            Profile
          </a>
          <a
            href="#"
            className="text-black hover:text-white transition duration-300 hover:bg-black border border-neutral-900 p-2 rounded-full px-3"
          >
            Log out
          </a>
        </div>
       <LDropdown />
      </div>
    </div>
  );
};

export default Header;
