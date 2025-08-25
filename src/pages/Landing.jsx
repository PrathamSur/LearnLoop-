import React from 'react'
import LHeader from '../Components/LHeader'
import { useNavigate } from "react-router-dom";
import image1 from "../images/classpic.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


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
              <div>
                <DotLottieReact
                  src="/animation1.lottie"
                  autoplay
                  loop
                  className="lg:min-w-[1000px]"
                />
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