import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AddStudent from './components/teacher/AddStudent';
import CreateAssignment from './components/teacher/CreateAssignment';
import AssignmentFeedback from './components/teacher/AssignmentFeedback';
import StudentDashboard from './components/student/StudentDashboard';
import EditProfile from './components/student/EditProfile';
import SubmitAssignment from './components/student/SubmitAssignment';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (role, data) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserData(null);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? (
              <Navigate to={userRole === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} />
            ) : (
              <Login onLogin={handleLogin} />
            )} 
          />
          
          {/* Teacher Routes */}
          <Route 
            path="/teacher/dashboard" 
            element={isAuthenticated && userRole === 'teacher' ? (
              <TeacherDashboard userData={userData} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          <Route 
            path="/teacher/add-student" 
            element={isAuthenticated && userRole === 'teacher' ? (
              <AddStudent userData={userData} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          <Route 
            path="/teacher/create-assignment" 
            element={isAuthenticated && userRole === 'teacher' ? (
              <CreateAssignment userData={userData} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          <Route 
            path="/teacher/assignment-feedback/:id" 
            element={isAuthenticated && userRole === 'teacher' ? (
              <AssignmentFeedback userData={userData} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          
          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={isAuthenticated && userRole === 'student' ? (
              <StudentDashboard userData={userData} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          <Route 
            path="/student/edit-profile" 
            element={isAuthenticated && userRole === 'student' ? (
              <EditProfile userData={userData} setUserData={setUserData} />
            ) : (
              <Navigate to="/" />
            )} 
          />
          <Route 
            path="/student/submit-assignment/:id" 
            element={isAuthenticated && userRole === 'student' ? (
              <SubmitAssignment userData={userData} />
            ) : (
              <Navigate to="/" />
            )} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;