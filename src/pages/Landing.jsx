import React from 'react'
import LHeader from '../Components/LHeader'
import { useNavigate } from "react-router-dom";
import animationData from "../images/OnlineTeaching.json";
import Lottie from "lottie-react";


const Landing = () => {
  const navigate = useNavigate();
  
    const handleNavigation = () => {
      navigate("/classes"); // Navigate to the Class page
    };
  return (
    <div className='bg-[#d65514] flex flex-col justify-start '>
      <LHeader />
      <div className="flex flex-col h-full w-full bg-[#F2F4F5] ">
            <div className="flex flex-col items-center justify-start h-100 w-full px-5 lg:p-8">
              <h1 className="text-4xl text-black font-bold text-center mt-10 md:text-6xl">
                Sketch, <br className="lg:hidden" /> Teach, Connect
              </h1>
              <p className="text-center font-light text-black mt-2 text-[1.2rem]">
                LearnLoop is a platform designed to connect teachers and students
                through interactive learning <br className="hidden lg:block"></br>{" "}
                experiences.
              </p>
              <button
                onClick={handleNavigation}
                className="my-3 bg-black text-white px-3 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                Get Started
              </button>
              <div className='p-5 w-full lg:w-3/4 '>
                <Lottie animationData={animationData} loop={true} />
              </div>
              <div className='flex flex-col gap-2 justify-center lg:flex-row lg:flex-wrap lg:gap-5 items-center mt-10 mb-10'>
                <div className='border border-gray p-10 rounded-3xl w-fit bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg lg:w-1/3'><h1 className='font-bold text-2xl mb-2'>Hello</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore vero voluptates iste eaque velit soluta blanditiis quia </div>
                <div className='border border-gray p-10 rounded-3xl w-fit bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg lg:w-1/3'><h1 className='font-bold text-2xl mb-2'>Hello</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore vero voluptates iste eaque velit soluta blanditiis quia </div>
                <div className='border border-gray p-10 rounded-3xl w-fit bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg lg:w-1/3'><h1 className='font-bold text-2xl mb-2'>Hello</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore vero voluptates iste eaque velit soluta blanditiis quia </div>
                <div className='border border-gray p-10 rounded-3xl w-fit bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg lg:w-1/3'><h1 className='font-bold text-2xl mb-2'>Hello</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore vero voluptates iste eaque velit soluta blanditiis quia </div>
              </div>
      
              <div className="flex flex-col items-center justify-start h-screen  w-full">
                <img
                  src="https://external-preview.redd.it/rY3pRjpRuCLgQ90fYO6g-O_-KGRlyShM69AuptvKT5w.jpg?width=1080&crop=smart&auto=webp&s=b6d3753d6791b8d118768091359ee6525cccba95"
                  alt="Background"
                  className="w-fit h-fit object-cover mt-10 lg:mt-0 lg:rounded-3xl"
                />
      
                <h2 className="text-2xl text-black font-semibold mt-6 lg:text-4xl">
                  Join Our Community
                </h2>
                <p className="text-black mt-2">
                  Connect with like-minded individuals, share knowledge, and enhance
                  your learning journey.
                </p>
                <button
                  onClick={handleNavigation}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
                >
                  Explore Classes
                </button>
              </div>
            </div>
          </div>
      </div>
  );
};

export default Landing;