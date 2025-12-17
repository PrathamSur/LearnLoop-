import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { IoCopyOutline } from 'react-icons/io5'; 

// --- Component 1: Minimal Top Bar ---
const MinimalTopBar = ({ userType }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear local storage data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        
        // 🚨 FIXED: Navigate to the Landing Page ('/')
        navigate('/'); 
    };

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md z-10">
            <Link
                to={`/${userType}/dashboard`}
                className="flex items-center text-xl font-bold text-gray-900"
            >
                <img src="/assets/images/LL-logo.png" alt="" className="h-8 w-auto mr-2" />
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
// --- Component 2: Create Assignment (Teacher Only) ---
// ------------------------------------------------------------------
const CreateAssignmentForm = ({ courseId, fetchCourseContent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post(`/teacher/courses/${courseId}/assignments`, {
                title, description, due_date: dueDate
            });

            alert('Assignment created successfully!');
            setTitle(''); setDescription(''); setDueDate('');
            fetchCourseContent(); 

        } catch (err) {
            console.error("Assignment Creation Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to create assignment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">📝 Create New Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="2" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Post Assignment'}
                </button>
            </form>
        </div>
    );
};


// ------------------------------------------------------------------
// --- Component 3: Upload Resource (Teacher Only) ---
// ------------------------------------------------------------------
const UploadResourceForm = ({ courseId, fetchCourseContent }) => {
    const [title, setTitle] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post(`/teacher/courses/${courseId}/resources`, {
                title, fileUrl: fileUrl 
            });

            alert('Resource uploaded successfully!');
            setTitle(''); setFileUrl('');
            fetchCourseContent(); 

        } catch (err) {
            console.error("Resource Upload Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to upload resource.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">📁 Upload Course Material</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title of Resource</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">File URL/Path</label>
                    <input type="text" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="e.g., /uploads/lecture_notes.pdf or a cloud URL" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700"
                >
                    {loading ? 'Uploading...' : 'Upload Material'}
                </button>
            </form>
        </div>
    );
};


// ------------------------------------------------------------------
// --- Component 4: Assignment Submission (Student Only) ---
// ------------------------------------------------------------------
const AssignmentSubmissionForm = ({ assignmentId, fetchCourseContent }) => {
    const [submissionFile, setSubmissionFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // HITS BACKEND ROUTE: POST /api/student/assignments/:assignmentId/submit
            await api.post(`/student/assignments/${assignmentId}/submit`, { submissionFile });

            alert('Assignment submitted successfully!');
            setSubmissionFile('');
            fetchCourseContent(); 

        } catch (err) {
            console.error("Submission Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to submit assignment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 p-3 border-t border-gray-200">
            <h4 className="text-sm font-semibold mb-2">Submit Your Work:</h4>
            <input 
                type="url" 
                value={submissionFile} 
                onChange={(e) => setSubmissionFile(e.target.value)} 
                placeholder="Paste File URL (e.g., Google Drive link)"
                required
                className="w-full p-2 text-sm border border-gray-300 rounded-md mb-2" 
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white text-sm py-1 px-3 rounded-md hover:bg-orange-600 transition-colors"
            >
                {loading ? 'Submitting...' : 'Submit Assignment'}
            </button>
        </form>
    );
};


// ------------------------------------------------------------------
// --- Component 5: Submission Tracker (Teacher Only - Basic Stats) ---
// ------------------------------------------------------------------
const SubmissionTracker = ({ courseId }) => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchTrackerData = async () => {
        setLoading(true);
        try {
            // HITS BACKEND ROUTE: GET /api/teacher/courses/:courseId/students/submissions
            const res = await api.get(`/teacher/courses/${courseId}/students/submissions`);
            setTotalStudents(res.data.students.length);
        } catch (error) {
            console.error("Tracker data fetch error:", error);
            setTotalStudents('N/A');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrackerData();
    }, [courseId]);

    if (loading) {
        return <div className="p-6 bg-white rounded-lg shadow-md mb-6">Loading Stats...</div>;
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">📊 Class Statistics</h3>
            <p className="text-2xl font-extrabold text-blue-600">Total Students: {totalStudents}</p>
        </div>
    );
};


// ------------------------------------------------------------------
// --- Main CourseDetails Component ---
// ------------------------------------------------------------------
const CourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userType = localStorage.getItem('userType');
    const isTeacher = userType === 'teacher';

    const fetchCourseContent = async () => {
        setLoading(true);
        setError(null);
        try {
            // HITS THE COMBINED BACKEND ROUTE: /api/(teacher/student)/courses/:courseId/content
            const endpoint = isTeacher
                ? `/teacher/courses/${courseId}/content`
                : `/student/courses/${courseId}/content`;

            const res = await api.get(endpoint);

            setCourse(res.data.course);
            setAssignments(res.data.assignments || []);
            setResources(res.data.resources || []);

        } catch (err) {
            console.error("Fetch Content Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to load course content. Check the Course ID.');
            if (err.response && (err.response.status === 404 || err.response.status === 403)) {
                // Redirect if course not found or access denied (Fixes the student dashboard redirect issue)
                navigate(isTeacher ? '/teacher/dashboard' : '/student/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };
    
    // --- Delete Handlers ---
    const handleDeleteAssignment = async (assignmentId, assignmentTitle) => {
        if (!window.confirm(`Are you sure you want to delete the assignment: "${assignmentTitle}"? This will delete all student submissions for it too.`)) {
            return;
        }
        try {
            await api.delete(`/teacher/assignments/${assignmentId}`);
            alert(`Assignment "${assignmentTitle}" deleted successfully.`);
            fetchCourseContent(); // Refresh the list
        } catch (err) {
            console.error("Delete Assignment Error:", err);
            alert(err.response?.data?.message || 'Failed to delete assignment.');
        }
    };
    
    const handleDeleteResource = async (resourceId, resourceTitle) => {
        if (!window.confirm(`Are you sure you want to delete the resource: "${resourceTitle}"?`)) {
            return;
        }
        try {
            await api.delete(`/teacher/resources/${resourceId}`);
            alert(`Resource "${resourceTitle}" deleted successfully.`);
            fetchCourseContent(); // Refresh the list
        } catch (err) {
            console.error("Delete Resource Error:", err);
            alert(err.response?.data?.message || 'Failed to delete resource.');
        }
    };
    
    // Logic to handle Student leaving a course
    const handleLeaveCourse = async () => {
        if (!window.confirm(`Are you sure you want to leave the course "${course.name}"? You will lose access to all content.`)) {
            return;
        }

        try {
            await api.delete(`/student/courses/${courseId}/leave`);
            alert(`Successfully left the course: ${course.name}`);
            navigate('/classes');

        } catch (err) {
            console.error("Leave Course Error:", err.response?.data || err.message);
            alert(err.response?.data?.message || 'Failed to leave course.');
        }
    };


    useEffect(() => {
        fetchCourseContent();
    }, [courseId, userType]);


    if (loading) {
        return <div className="p-20 text-center text-xl">Loading Course...</div>;
    }

    if (error) {
        return <div className="p-20 text-center text-red-500 text-xl">{error}</div>;
    }

    if (!course) {
        return <div className="p-20 text-center text-gray-500 text-xl">Course not found.</div>;
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(course.code);
        alert(`Course code ${course.code} copied to clipboard!`);
    };


    return (
        <div className="min-h-screen bg-[#f1f3f3] flex flex-col pt-20">
            <MinimalTopBar userType={userType} />

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 max-w-7xl mx-auto w-full">
                
                {/* --- HEADER BLOCK --- */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{course.name}</h1>

                <div className="flex items-center justify-between mb-6">
                    
                    {/* Course Code and Description */}
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <p className="text-lg text-gray-600 mr-4">
                                Course Code:
                                <span className="font-semibold text-blue-700 ml-1">{course.code}</span>
                            </p>
                            {isTeacher && (
                                <button
                                    onClick={handleCopyCode}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Copy Course Code"
                                >
                                    <IoCopyOutline className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                        <p className="text-gray-700 mt-2 italic">{course.description}</p>
                    </div>

                    {/* Back and Leave Buttons */}
                    <div className="flex items-center space-x-4">
                        {/* TODO: Add a Live Session button here when the whiteboard is ready */}
                        
                        <Link to="/classes" className="text-blue-600 hover:text-blue-800 inline-block">
                            &larr; Back to all Classes
                        </Link>

                        {/* Leave Course Button (Student Only) */}
                        {!isTeacher && (
                            <button
                                onClick={handleLeaveCourse}
                                className="bg-red-500 text-white text-sm py-2 px-4 rounded-3xl font-semibold hover:bg-red-600 transition-colors"
                            >
                                Leave Course
                            </button>
                        )}
                    </div>
                </div>
                {/* --- END HEADER BLOCK --- */}


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">

                    {/* 1. TEACHER: Forms for Creation/Management | STUDENT: Hidden */}
                    {isTeacher && (
                        <div className="md:col-span-1 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Management Tools</h2>
                            
                            {/* Enrollment Count/Basic Stats */}
                            <SubmissionTracker courseId={courseId} /> 
                            
                            <CreateAssignmentForm courseId={courseId} fetchCourseContent={fetchCourseContent} />
                            <UploadResourceForm courseId={courseId} fetchCourseContent={fetchCourseContent} />
                        </div>
                    )}

                    {/* 2. Content Display (Assignments & Resources) */}
                    <div className={isTeacher ? "md:col-span-2 space-y-8" : "md:col-span-3 space-y-8"}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Assignments Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-orange-600">🎯 Assignments ({assignments.length})</h2>
                            {assignments.length === 0 ? (
                                <p className="text-gray-500">{isTeacher ? "No assignments posted yet." : "No active assignments."}</p>
                            ) : (
                                <div className="space-y-4">
                                    {assignments.map(assignment => (
                                        <div key={assignment._id} className="p-3 border border-gray-200 rounded-md bg-gray-50 relative">
                                            
                                            {/* 🚨 DELETE BUTTON (Teacher Only) */}
                                            {isTeacher && (
                                                <button
                                                    onClick={() => handleDeleteAssignment(assignment._id, assignment.title)}
                                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                                                    title="Delete Assignment"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.86 10.99A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.99L5 7m5 3v6m4-6v6m1-9H8a1 1 0 00-1 1v2h10V9a1 1 0 00-1-1z" />
                                                    </svg>
                                                </button>
                                            )}

                                            {/* H3/Link remains the same for both Teacher and Student */}
                                            {isTeacher ? (
                                                <Link 
                                                    to={`/course/${courseId}/assignment/${assignment._id}/submissions`}
                                                    className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer block pr-10"
                                                >
                                                    {assignment.title} 
                                                    <span className="text-xs text-red-500 ml-2">(Click to Review Submissions)</span>
                                                </Link>
                                            ) : (
                                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                            )}

                                            <p className="text-sm text-gray-700">{assignment.description}</p>
                                            <p className="text-xs text-red-500 mt-1">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                                            
                                            {/* 🚨 Student Submission Form/Status (FINAL LOGIC) */}
                                            {!isTeacher && (
                                                <div className="mt-2 pt-2 border-t border-gray-200">
                                                    {assignment.submissionStatus === 'Submitted' ? (
                                                        <div className="text-sm text-green-700 bg-green-100 p-2 rounded-md flex items-center justify-between">
                                                            <span className="font-bold">✅ Submitted!</span>
                                                            
                                                            {assignment.submissionDetails && (
                                                                <a 
                                                                    href={assignment.submissionDetails.submissionFile} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline text-xs ml-2"
                                                                >
                                                                    View Submitted File
                                                                </a>
                                                            )}
                                                            <span className="text-xs text-gray-600 ml-auto">
                                                                on {new Date(assignment.submissionDetails?.submittedAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <AssignmentSubmissionForm 
                                                            assignmentId={assignment._id} 
                                                            fetchCourseContent={fetchCourseContent} 
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Resources Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-green-600">📚 Course Materials ({resources.length})</h2>
                            {resources.length === 0 ? (
                                <p className="text-gray-500">No resources have been uploaded yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {resources.map(resource => (
                                        <div key={resource._id} className="p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-150 relative">
                                            
                                            {/* 🚨 DELETE BUTTON (Teacher Only) */}
                                            {isTeacher && (
                                                <button
                                                    onClick={() => handleDeleteResource(resource._id, resource.title)}
                                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
                                                    title="Delete Resource"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.86 10.99A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.99L5 7m5 3v6m4-6v6m1-9H8a1 1 0 00-1 1v2h10V9a1 1 0 00-1-1z" />
                                                    </svg>
                                                </button>
                                            )}
                                            
                                            <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center pr-10">
                                                <span className="text-xl mr-3">🔗</span>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                                                    <p className="text-xs text-blue-600 truncate">{resource.fileUrl}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        </div>

                        

                        
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetails;