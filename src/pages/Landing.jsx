import React from 'react'
import LHeader from '../Components/LHeader'
import { useNavigate } from "react-router-dom";
import animationData from "../images/OnlineTeaching.json";
import loop from "../images/loop.json";
import Lottie from "lottie-react";
import FAQSection from '../Components/FAQ';


const Landing = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/classes"); // Navigate to the Class page
  };
  return (
    <div className="min-h-screen flex flex-col">
      <LHeader />
      <div className="flex flex-grow flex-col h-full w-full bg-[#F2F4F5] ">

        <div className="flex flex-col items-center h-100 w-full px-5 lg:p-8">
          <h1 className='text-2xl font-bold'>Learn in a Loop</h1> <div className='w-32 h-32 overflow-hidden flex items-center justify-center'><Lottie animationData={loop} loop={true} className='' /></div>
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
              <h1 className="font-bold text-3xl mb-3">Management <img src="./management.png" alt="" className='' /></h1>
              <p className="text-gray-700">Create & Manage Courses → Teachers can set up courses in seconds.</p>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-3xl mb-3">Homeworks <img src="./homework.png" alt="" /></h1>
              <p className="text-gray-700">Assignments & Submissions → Share tasks, collect work, and grade easily.</p>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-3xl mb-3">Notice <img src="./notice.png" alt="" /></h1>
              <p className="text-gray-700">Announcements & Discussions → Keep everyone updated and engaged.</p>
            </div>

            {/* Card 4 */}
            <div className="border border-gray-300 p-8 rounded-3xl w-full max-w-sm bg-gradient-to-br from-white to-[#e7f3f8] shadow-lg hover:scale-105 transition-transform duration-300">
              <h1 className="font-bold text-3xl mb-3">Resource Hub <img src="./resources.png" alt="" /></h1>
              <p className="text-gray-700">Store notes, videos, and study material in one place.</p>
            </div>
          </div>

        </div>

        <div className='bg-gradient-to-r from-[#d1e0e9] to-slate-50 w-full flex flex-col items-center justify-end p-5 lg:p-10 gap-10 rounded-3xl'>
          <div className='w-full flex flex-col items-center justify-center lg:w-2/3'>
            <h1 className='text-3xl font-bold m-4 lg:text-5xl'>For Teachers</h1>
            <img src="./Teachers.png" alt="background" className='w-fit rounded-3xl shadow-slate-400 shadow-xl ' />
          </div>

          <div className='w-full flex flex-col items-center justify-center lg:w-2/3'>
            <h1 className='text-3xl font-bold m-4 lg:text-5xl'>For Students</h1>
            <img src="./Students.png" alt="background" className='w-fit rounded-3xl shadow-gray-500 shadow-lg ' />
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center rounded-3xl">

            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Why LearnLoop?</h2>
              <p class="text-gray-700 leading-relaxed">
                LearnLoop is an innovative online learning platform that connects teachers and students through interactive and engaging educational experiences. It offers a range of features designed to enhance the learning process, including course management, homework assignments, announcements, and a resource hub for study materials.
              </p>
              <p class="text-gray-700 leading-relaxed mt-4">
                With its user-friendly interface and comprehensive tools, LearnLoop aims to create a collaborative and dynamic learning environment for all users.
              </p>
            </div>


            <div class="bg-white shadow-lg rounded-2xl p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h3>
              <ul class="space-y-2 text-gray-700">
                <li>✅ Mobile App for iOS and Android</li>
                <li>✅ Live Classes and Webinars</li>
                <li>✅ AI Powered Study Assistant</li>
                <li>✅ Peer-to-Peer Learning Features</li>
                <li>✅ Integration with Popular Educational Tools</li>
              </ul>
            </div>
          </div>

          <FAQSection />

          <div className="flex flex-col items-center w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRMSssBC5NAaRFOyX3uvPVzEDXkkJB2IaLg&s"
              alt="Background"
              className="w-fit h-fit object-cover mt-10 lg:mt-0 lg:rounded-3xl"
            />

            <h2 className="text-2xl text-black font-semibold mt-6 lg:text-4xl">
              Powered By Excalidraw
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

          {/* Footer  */}

          <footer className="bg-gradient-to-br from-[#050505] to-[#262b2c] border-t border-gray-200 rounded-3xl mt-10 w-full">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Logo & About */}
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-3">LearnLoop</h2>
                <p className="text-white text-sm leading-relaxed">
                  Connecting students and teachers through interactive learning experiences.
                  Learn smarter, not harder.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Features</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">FAQ</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                <ul className="space-y-2 text-white text-sm">
                  <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
                <p className="text-white text-sm mb-3">Subscribe to get the latest updates and features.</p>
                <form className="flex flex-col sm:flex-row w-full gap-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} LearnLoop. All rights reserved.
            </div>
          </footer>


        </div>
      </div>
    </div>
  );
};

export default Landing;