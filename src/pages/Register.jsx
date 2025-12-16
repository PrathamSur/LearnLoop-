// src/pages/Register.jsx
import React, { useState } from "react";
// Change from 'axios' to our customized instance
import api from '../utils/axiosInstance'; 
import { Link, useNavigate } from 'react-router-dom';

// Note: No need for API_BASE_URL here anymore, as it's in axiosInstance

const Register = () => {
    // ... (State and handler definitions remain the same) ...
    const [userType, setUserType] = useState("student"); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [courseYear, setCourseYear] = useState("");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        let submissionData = {
            name,
            email,
            password,
            userType, 
        };

        if (userType === 'student') {
            submissionData.courseYear = courseYear;
        } else if (userType === 'teacher') {
            submissionData.department = department;
        }

        try {
            // 🚨 FIX: Endpoint changed from '/register' to '/auth/register'
            const res = await api.post('/auth/register', submissionData); 

            alert(res.data.message || "Registered successfully! Please log in.");
            navigate('/login'); 

        } catch (err) {
            console.error("Registration Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#f1f3f3] p-4 justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-300 flex flex-col items-center justify-center p-6 bg-white 
                          w-full max-w-md rounded-2xl shadow-lg"
            >
                <h1 className="text-4xl text-gray-900 font-extrabold mb-6 tracking-tight">
                    Create Account
                </h1>
                <p className="text-gray-500 mb-6 text-center">
                    Sign up as a Student or Teacher.
                </p>

                {/* Role Selection */}
                <div className="w-full mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Register As</label>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            // Set userType state
                            onClick={() => setUserType("student")} 
                            className={`w-1/2 p-3 rounded-lg border 
                                        ${userType === "student" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            // Set userType state
                            onClick={() => setUserType("teacher")}
                            className={`w-1/2 p-3 rounded-lg border 
                                        ${userType === "teacher" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Teacher
                        </button>
                    </div>
                </div>

                {/* Name, Email, Password Inputs (Remain the same) */}
                {/* ... (Your existing input fields for Name, Email, Password) ... */}
                
                {/* Name */}
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                {/* Email */}
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                {/* Password */}
                <div className="w-full mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>


                {/* CONDITIONAL FIELDS */}
                {userType === 'student' && (
                    <div className="w-full mb-4">
                        <label htmlFor="courseYear" className="block text-gray-700 font-medium mb-1">Course Year</label>
                        <input
                            id="courseYear"
                            type="number"
                            placeholder="e.g., 2024"
                            value={courseYear}
                            onChange={(e) => setCourseYear(e.target.value)}
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                )}

                {userType === 'teacher' && (
                    <div className="w-full mb-4">
                        <label htmlFor="department" className="block text-gray-700 font-medium mb-1">Department</label>
                        <input
                            id="department"
                            type="text"
                            placeholder="e.g., Computer Science"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                )}
                
                {/* Error Message Display */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded w-full text-center">
                        {error}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded-lg font-semibold 
                              hover:bg-gray-800 transition-colors duration-200 mt-2"
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                {/* Link to Login */}
                <p className="text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;