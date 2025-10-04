import React from 'react'

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Lorem Ipsum</h1>
          <p className="text-gray-500">Student</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 text-center">
         
          <div>
            <h2 className="text-xl font-bold text-gray-800">4.2k</h2>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            Passionate developer with experience in building web apps using React,
            Node.js, and MongoDB. Always learning and exploring new technologies.
          </p>
        </div>

        {/* Buttons */}
        <div className=" flex mt-6 justify-around ">
          <button className="w-1/2 border border-black-500 text-black-500 py-2 px-4 rounded-xl  shadow hover:bg-blue-50 transition">
            Follow
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
