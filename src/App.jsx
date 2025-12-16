// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Import all necessary pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AssignmentSubmissions from './pages/AssignmentSubmissions';

// Main Dashboard Pages (Need to be imported!)
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Core Application Pages (Need to be imported!)
import Classrooms from "./pages/Classrooms";
import WhiteBoard from "./pages/WhiteBoard";
import CourseDetails from "./pages/CourseDetails";


// 🛡️ ProtectedRoute Component (Must be defined here or in a separate file)
const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userType !== requiredRole) {
    const redirectPath = userType === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Element {...rest} />;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. Protected Dashboard Routes (The missing routes!) */}
        <Route
          path="/teacher/dashboard"
          element={<ProtectedRoute element={TeacherDashboard} requiredRole="teacher" />}
        />
        <Route
          path="/student/dashboard"
          element={<ProtectedRoute element={StudentDashboard} requiredRole="student" />}
        />

        {/* 3. Protected Core Application Routes (Also needed) */}
        <Route
          path="/classes"
          element={<ProtectedRoute element={Classrooms} />}
        />
        <Route
          path="/course/:courseId"
          element={<ProtectedRoute element={CourseDetails} />}
        />
        <Route
          path="/whiteboard"
          element={<ProtectedRoute element={WhiteBoard} />}
        />
        <Route
          path="/course/:courseId/assignment/:assignmentId/submissions"
          element={<ProtectedRoute element={AssignmentSubmissions} requiredRole="teacher" />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} />}
        />

        {/* Fallback 404 Route */}
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;