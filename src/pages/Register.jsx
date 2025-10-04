import React from 'react'
import { Link } from "react-router-dom";
import Login from "./Login";

const Register = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f1f3f3] p-4 justify-center items-center">
      <form 
        className="border border-gray-300 flex flex-col items-center justify-center p-6 bg-white 
                   w-full max-w-md rounded-2xl shadow-lg"
      >
        
        <h1 className="text-4xl text-gray-900 font-extrabold mb-6 tracking-tight">
          Register
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Please enter your details to continue.
        </p>

        
        <div className="w-full mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        
        <div className="w-full mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg font-semibold 
                     hover:bg-gray-800 transition-colors duration-200"
        >
          Login
        </button>

        
        <p className="text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <a
            href="/Login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
