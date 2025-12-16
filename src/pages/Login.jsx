// src/pages/Login.jsx
import React, { useState } from 'react';
// Change from 'axios' to our customized instance
import api from '../utils/axiosInstance'; 
import { useNavigate, Link } from 'react-router-dom';

// Note: No need for API_BASE_URL here anymore

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 🚨 FIX: Endpoint changed from '/login' to '/auth/login'
            const res = await api.post('/auth/login', {
                email,
                password,
            });

            // Backend returns { token, user: { userType, ... } }
            const { token, user } = res.data; 

            if (token && user?.userType) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userType', user.userType); 
                
                if (user.userType === 'teacher') {
                    navigate('/teacher/dashboard'); 
                } else if (user.userType === 'student') {
                    navigate('/student/dashboard'); 
                } else {
                    navigate('/');
                }
            } else {
                throw new Error("Login failed: Missing token or user type.");
            }

        } catch (err) {
            console.error("Login Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
        } finally {
            setLoading(false);
        }
    };

    // ... (JSX render structure remains the same as previously modified) ...
    return (
        <div className="flex flex-col h-screen w-full bg-[#f1f3f3] p-4 justify-center items-center">
            <form 
                onSubmit={handleSubmit}
                className="border border-gray-300 flex flex-col items-center justify-center p-6 bg-white 
                           w-full max-w-md rounded-2xl shadow-lg"
            >
                {/* ... (omitted static text) ... */}
                <h1 className="text-4xl text-gray-900 font-extrabold mb-6 tracking-tight">Login</h1>
                <p className="text-gray-500 mb-6 text-center">
                    Please enter your details to continue.
                </p>

                {/* Email Input */}
                <div className="w-full mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Password Input */}
                <div className="w-full mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                
                {/* Error Message Display */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded w-full text-center">
                        {error}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded-lg font-semibold 
                               hover:bg-gray-800 transition-colors duration-200"
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>

                {/* Link to Register */}
                <p className="text-gray-600 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;