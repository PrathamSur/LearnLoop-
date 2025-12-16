// src/pages/AssignmentSubmissions.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { IoCheckmarkCircle, IoCloseCircle, IoDocumentText } from 'react-icons/io5';

// You will need to import the MinimalTopBar component or define it here
// (Assuming MinimalTopBar is reusable as a separate file or defined globally)

const AssignmentSubmissions = () => {
    const { courseId, assignmentId } = useParams();
    const [trackerData, setTrackerData] = useState(null);
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrackerData = async () => {
        setLoading(true);
        setError(null);
        try {
            // HITS BACKEND ROUTE: GET /api/teacher/courses/:courseId/students/submissions
            const res = await api.get(`/teacher/courses/${courseId}/students/submissions`);
            
            const data = res.data;
            
            // 1. Find the specific assignment details
            const targetAssignment = data.assignments.find(a => a._id === assignmentId);
            if (!targetAssignment) {
                 setError("Assignment not found in course data.");
                 setLoading(false);
                 return;
            }
            setAssignment(targetAssignment);

            // 2. Process student submissions for *this* assignment
            const processedStudents = data.students.map(student => {
                const submission = student.submissions.find(sub => sub.assignmentId === assignmentId);
                
                return {
                    studentId: student.studentId,
                    name: student.name,
                    submitted: !!submission,
                    submission: submission,
                    isLate: submission && (new Date(submission.submittedAt) > new Date(targetAssignment.due_date))
                };
            });
            
            setTrackerData(processedStudents);

        } catch (err) {
            console.error("Submission Tracker Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to fetch submission data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrackerData();
    }, [courseId, assignmentId]);

    // --- Loading and Error States ---
    if (loading) {
        return <div className="p-20 text-center text-xl">Loading Submission Data...</div>;
    }
    if (error) {
        return <div className="p-20 text-center text-red-500 text-xl">{error}</div>;
    }
    if (!assignment) {
        return <div className="p-20 text-center text-gray-500 text-xl">Assignment details could not be loaded.</div>;
    }

    const totalStudents = trackerData.length;
    const submittedCount = trackerData.filter(s => s.submitted).length;
    const missingCount = totalStudents - submittedCount;
    
    return (
        <div className="min-h-screen bg-[#f1f3f3] flex flex-col pt-20">
            {/* MinimalTopBar component needs to be imported/defined */}
            {/* <MinimalTopBar userType="teacher" /> */} 

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 max-w-7xl mx-auto w-full">
                <Link to={`/course/${courseId}`} className="text-blue-600 hover:text-blue-800 inline-block mb-4">
                    &larr; Back to Course: {assignment.title}
                </Link>
                
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{assignment.title}</h1>
                {/* <p className="text-lg text-gray-600 mb-6">Review for Course ID: {courseId}</p> */}

                <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                    <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-blue-500">
                        <p className="text-sm text-gray-500">Total Enrolled</p>
                        <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-green-500">
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="text-3xl font-bold text-green-600">{submittedCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-red-500">
                        <p className="text-sm text-gray-500">Missing</p>
                        <p className="text-3xl font-bold text-red-600">{missingCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                    <h2 className="text-2xl font-bold mb-4">Detailed Submission List</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Link</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {trackerData.map(student => (
                                <tr key={student.studentId} className="hover:bg-gray-50">
                                    {/* Student Name */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student.name}
                                    </td>
                                    
                                    {/* Status */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {student.submitted ? (
                                            <span className={`flex items-center justify-center font-semibold ${student.isLate ? 'text-yellow-600' : 'text-green-600'}`}>
                                                <IoCheckmarkCircle className="w-5 h-5 mr-1" /> 
                                                {student.isLate ? 'Submitted (LATE)' : 'Submitted'}
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center font-semibold text-red-600">
                                                <IoCloseCircle className="w-5 h-5 mr-1" /> 
                                                Missing
                                            </span>
                                        )}
                                    </td>
                                    
                                    {/* Submission Link */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {student.submission ? (
                                            <a 
                                                href={student.submission.submissionFile} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
                                            >
                                                <IoDocumentText className="w-5 h-5 mr-1" /> View File
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>

                                    {/* Submitted On */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        {student.submission ? new Date(student.submission.submittedAt).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                    </td>
                                    
                                    {/* Actions (e.g., Grading input) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {/* TODO: Implement a grading form here (e.g., input field for marks) */}
                                        <button className="text-purple-600 hover:text-purple-800 text-sm disabled:text-gray-400" disabled={!student.submitted}>Grade</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AssignmentSubmissions;