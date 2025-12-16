// src/pages/Classrooms.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { IoCopyOutline } from 'react-icons/io5'; 

// --- Minimal Top Bar (OK) ---
const MinimalTopBar = ({ userType }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md z-10">
            <Link 
                to={`/${userType}/dashboard`} 
                className="flex items-center text-xl font-bold text-gray-900"
            >
                <img 
                    src="/assets/images/LL-logo.png" 
                    alt="LearnLoop Logo" 
                    className="h-8 w-auto mr-2" 
                />
                LearnLoop
            </Link>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-sm py-2 px-4 rounded-3xl font-semibold hover:bg-red-600 transition-colors"
            >
                Log Out
            </button>
        </header>
    );
};

// ------------------------------------------------------------------
// --- 1. Join Course Form (Student Only) ---
// ------------------------------------------------------------------
const JoinCourseForm = ({ fetchCourses }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // HITS THE CORRECT BACKEND ROUTE: POST /api/student/courses/join
            const res = await api.post('/student/courses/join', { 
                code: code 
            });

            alert(res.data.message || 'Successfully joined the class!');
            setCode('');
            fetchCourses(); 

        } catch (err) {
            console.error("Enrollment Error:", err.response?.data || err.message);
            // Handle duplicate enrollment message from backend (400)
            setError(err.response?.data?.message || 'Failed to join class. Check the code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-20">
            <h3 className="text-xl font-bold mb-4">🤝 Join a New Class</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Course Code</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="e.g., CRS-A1B2C3"
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                    {loading ? 'Joining...' : 'Join Class'}
                </button>
            </form>
        </div>
    );
};


// ------------------------------------------------------------------
// --- 2. Create Course Form (Teacher Only) ---
// ------------------------------------------------------------------
const CreateCourseForm = ({ fetchCourses }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Teacher endpoint: POST /api/teacher/courses
            const res = await api.post('/teacher/courses', { 
                name, 
                description 
            });

            alert(res.data.message);
            
            setName('');
            setDescription('');
            fetchCourses(); // Refresh the list

        } catch (err) {
            console.error("Course Creation Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to create course. Access denied or server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-20">
            <h3 className="text-xl font-bold mb-4">✨ Create New Course</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="e.g., Advanced Physics"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Brief overview of the course content."
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                    {loading ? 'Creating...' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};


// ------------------------------------------------------------------
// --- 3. Course Card Component ---
// ------------------------------------------------------------------
const CourseCard = ({ course, isTeacher, fetchCourses }) => {
    
    // 1. Copy Course Code Logic
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Course code ${code} copied to clipboard!`);
    };

    // 2. Delete Course Logic (Teacher Only)
    const handleDelete = async (courseId, courseName) => {
        if (!window.confirm(`Are you sure you want to delete the course "${courseName}"? This action is permanent and cannot be undone.`)) {
            return;
        }

        try {
            // Endpoint: DELETE /api/teacher/courses/:courseId
            await api.delete(`/teacher/courses/${courseId}`);
            alert(`Course "${courseName}" deleted successfully.`);
            fetchCourses(); // Refresh the list after deletion
        } catch (err) {
            console.error("Delete Course Error:", err.response?.data || err.message);
            alert(err.response?.data?.message || 'Failed to delete course.');
        }
    };
    
    // Determine the target link for the card click
    const cardLink = `/course/${course._id}`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-t-4 border-blue-600 relative">
            
            {/* 🚨 DELETE BUTTON (Teacher Only) */}
            {isTeacher && (
                <button
                    onClick={(e) => {
                        e.preventDefault(); // Prevent navigating to course details
                        e.stopPropagation(); // Stop event propagation
                        handleDelete(course._id, course.name);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-100/50"
                    title="Delete Course"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.86 10.99A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.99L5 7m5 3v6m4-6v6m1-9H8a1 1 0 00-1 1v2h10V9a1 1 0 00-1-1z" />
                    </svg>
                </button>
            )}

            {/* Make the main card content clickable */}
            <Link to={cardLink} className="block">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description || 'Click to view details.'}</p>
                
                <div className="flex justify-between items-end text-xs text-gray-500 mt-3">
                    
                    {/* Course Code with Copy Button */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-blue-700">Code: {course.code}</span>
                        {isTeacher && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    e.stopPropagation(); 
                                    handleCopy(course.code);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                                title="Copy Course Code"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v4a1 1 0 001 1h4a1 1 0 001-1V7m-4 5h.01M12 21H6a2 2 0 01-2-2V7a2 2 0 012-2h4c0-.552.448-1 1-1h2c.552 0 1 .448 1 1h4a2 2 0 012 2v12a2 2 0 01-2 2h-6c-.552 0-1-.448-1-1v-4a1 1 0 00-1-1z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Timestamp/Teacher Info */}
                    <span>
                        {isTeacher ? (
                            <span className="text-xs">Created: {new Date(course.createdAt).toLocaleDateString()}</span>
                        ) : (
                            // The backend 'GET /student/courses' should ideally provide teacherName via population
                            <span className="text-xs">Teacher: {course.teacherName || 'N/A'}</span> 
                        )}
                    </span>
                </div>
            </Link>
        </div>
    );
}


// ------------------------------------------------------------------
// --- Main Classrooms Component ---
// ------------------------------------------------------------------
const Classrooms = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const userType = localStorage.getItem('userType');
    const isTeacher = userType === 'teacher';
    
    // The fetchCourses function is CRUCIAL here
    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            // Uses the correct endpoint based on role: /teacher/courses OR /student/courses
            let endpoint = isTeacher ? '/teacher/courses' : '/student/courses';
            
            const res = await api.get(endpoint); 
            setCourses(res.data.courses || []);

        } catch (err) {
            console.error("Fetch Courses Error:", err);
            const errorMessage = isTeacher 
                ? 'Failed to fetch your teaching courses.' 
                : 'Could not fetch your enrolled classes.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [isTeacher]);

    const title = isTeacher ? "Your Teaching Classes" : "Your Enrolled Classes";

    return (
        <div className="min-h-screen bg-[#f1f3f3] flex flex-col pt-20">
            <MinimalTopBar userType={userType} /> 
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 mt-2">{title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* 1. Side Panel (Creation or Joining) */}
                    <div className="md:col-span-1">
                        {isTeacher ? (
                            // Teacher: Show Create Course Form
                            <CreateCourseForm fetchCourses={fetchCourses} />
                        ) : (
                            // 🚨 Student: Show Join Course Form
                            <JoinCourseForm fetchCourses={fetchCourses} />
                        )}
                    </div>

                    {/* 2. Main Course List */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Course List</h2>
                        {loading && <p className="text-gray-500">Loading classes...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="space-y-4">
                            {!loading && courses.length === 0 && (
                                <div className="p-6 bg-white rounded-xl shadow-inner text-center text-gray-500">
                                    {isTeacher ? 'Start by creating your first course!' : 'Join a class using the form on the left.'}
                                </div>
                            )}
                            
                            {/* Render Course Cards */}
                            {courses.map(course => (
                                <CourseCard 
                                    key={course._id} 
                                    course={course} 
                                    isTeacher={isTeacher}
                                    fetchCourses={fetchCourses} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Classrooms;