// src/pages/TeacherDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 🚨 NO MORE HEADER OR SIDEBAR IMPORTS

// Component for the two clickable cards (reused for cleanliness)
const DashboardCard = ({ title, description, linkTo, icon }) => (
    <Link 
        to={linkTo} 
        className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg 
                   hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01]"
    >
        <span className="text-6xl mb-4">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>
    </Link>
);

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Teacher';
    const userType = 'teacher'; // Already confirmed by the ProtectedRoute
    
    const COURSES_PATH = '/classes'; 
    const WHITEBOARD_PATH = '/whiteboard'; 

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f1f3f3] flex flex-col pt-20"> 
            
            {/* 🚨 MINIMAL TOP BAR (Logo Left, Logout Right) */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md z-10">
                {/* Logo - Links to the Dashboard */}
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

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-[#F9050D] text-white text-sm py-2 px-4 rounded-3xl font-semibold hover:bg-red-600 transition-colors"
                >
                    Log Out
                </button>
            </header>

            {/* Main Content: Centered Cards */}
            <main className="flex-1 flex flex-col justify-center items-center p-8"> 
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
                    Welcome, {userName}!
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    
                    <DashboardCard
                        title="Live Whiteboard Class"
                        description="Start or join a real-time, interactive teaching session (Excalidraw)."
                        linkTo={WHITEBOARD_PATH}
                        icon="✏️"
                    />

                    <DashboardCard
                        title="Courses and Classes"
                        description="Manage your curriculum, materials, and assignments for all enrolled courses."
                        linkTo={COURSES_PATH}
                        icon="📚"
                    />
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;