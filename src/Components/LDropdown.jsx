import React, { useState } from 'react';

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left lg:hidden">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-white text-white px-4 py-2 rounded-2xl hover:border hover:border-black focus:outline-none">
      
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" d="M4.5 12h15m-15 5.77h15M4.5 6.23h15"/></svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-48 bg-white right-0 shadow-lg rounded-xl z-50">
          <a href="/login" className="block px-4 py-2 hover:bg-gray-100 hover:rounded-t-xl">Login</a>
          <a href="/register" className="block px-4 py-2 hover:bg-gray-100">Sign Up</a>
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:rounded-b-xl">Logout</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
