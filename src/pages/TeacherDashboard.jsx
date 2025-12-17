// src/pages/TeacherDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Method 1: Import the local image
import WhiteBoard from '../assets/whiteboard.png';

// 🚨 Reusable Component Updated to handle IMAGES 🚨
const DashboardCard = ({ title, description, linkTo, image }) => (
    <Link
        to={linkTo}
        className="flex flex-col items-center justify-start bg-white rounded-xl shadow-lg overflow-hidden
                   hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] h-full"
    >
        {/* IMAGE SECTION */}
        <div className="w-full h-70 w-full">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    </Link>
);

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Teacher';
    const userType = 'teacher';

    const COURSES_PATH = '/classes';
    const WHITEBOARD_PATH = '/whiteboard';

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f1f3f3] flex flex-col pt-10">

            {/* 🚨 MINIMAL TOP BAR */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md z-10">
                <Link
                    to={`/${userType}/dashboard`}
                    className="flex items-center text-xl font-bold text-gray-900"
                >
                    <img
                        src="/assets/images/LL-logo.png"
                        alt=""
                        className="h-8 w-auto mr-2"
                    />
                    LearnLoop
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-[#F9050D] text-white text-sm py-2 px-4 rounded-3xl font-semibold hover:bg-red-600 transition-colors"
                >
                    Log Out
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col justify-center items-center p-4">

                <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center mt-9">
                    Welcome, {userName}!
                </h1>

                <div
                    className="
                        grid grid-cols-1 md:grid-cols-2
                        gap-10 w-full mx-auto
                        max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl"
                >
                    <DashboardCard
                        title="Live Whiteboard Class"
                        description="Start or join a real-time, interactive teaching session (Excalidraw)."
                        linkTo={WHITEBOARD_PATH}
                        image="https://greenwoodhigh.edu.in/wp-content/uploads/2024/09/Innovative-Teaching-Methods-for-Modern-Classrooms-scaled.jpg"
                    />

                    <DashboardCard
                        title="Courses and Classes"
                        description="Manage your curriculum, materials, and assignments for all enrolled courses."
                        linkTo={COURSES_PATH}
                        image="https://img.freepik.com/premium-vector/young-woman-engages-online-education-using-her-laptop-surrounded-by-books-greenery-man-with-laptop-sitting-online-education-concept-distance-learning_538213-139091.jpg"
                    />
                </div>

            </main>
        </div>
    );
};

export default TeacherDashboard;