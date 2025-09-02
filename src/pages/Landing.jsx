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
          <div className="flex flex-col gap-6 justify-center items-center lg:flex-row lg:flex-wrap lg:gap-8 mt-10 mb-10">
            {/* Card 1 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-2xl mb-3">Management</h1>
              <p className="text-gray-700">Create & Manage Courses → Teachers can set up courses in seconds.</p>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-2xl mb-3">Homeworks</h1>
              <p className="text-gray-700">Assignments & Submissions → Share tasks, collect work, and grade easily.</p>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-2xl mb-3">Notice</h1>
              <p className="text-gray-700">Announcements & Discussions → Keep everyone updated and engaged.</p>
            </div>

            {/* Card 4 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-2xl mb-3">Resources Hub</h1>
              <p className="text-gray-700">Store notes, videos, and study material in one place.</p>
            </div>
          </div>

          <div className='bg-gradient-to-r from-[#d1e0e9] to-slate-50 w-full flex flex-col items-center justify-center p-5 lg:p-10 gap-10 rounded-3xl'>
            <div className='w-full flex flex-col items-center justify-center lg:w-2/3'>
              <h1 className='text-3xl font-bold m-4 lg:text-5xl'>For Teachers</h1>
              <img src="./Teachers.png" alt="background" className='w-fit rounded-3xl shadow-gray-500 shadow-lg ' />
            </div>

            <div className='w-full flex flex-col items-center justify-center lg:w-2/3'>
              <h1 className='text-3xl font-bold m-4 lg:text-5xl'>For Students</h1>
              <img src="./Students.png" alt="background" className='w-fit rounded-3xl shadow-gray-500 shadow-lg ' />
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
    </div>
  );
};

export default Landing;