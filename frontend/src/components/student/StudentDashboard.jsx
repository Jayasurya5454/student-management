import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = ({ userData, onLogout }) => {
  const [assignments, setAssignments] = useState([]);
  
  // Mock data initialization
  useEffect(() => {
    // In a real app, this would be an API call to get assignments for this student
    setAssignments([
      { 
        id: 1, 
        title: 'React Basics', 
        description: 'Create a simple React app with components', 
        dueDate: '2025-04-25',
        status: 'submitted',
        submissionDate: '2025-04-10',
        grade: 85,
        feedback: 'Good work! Consider adding more comments to your code.'
      },
      { 
        id: 2, 
        title: 'Database Design', 
        description: 'Design a database schema for an e-commerce website', 
        dueDate: '2025-05-05',
        status: 'pending',
        submissionDate: null,
        grade: null,
        feedback: null
      }
    ]);
  }, []);
  
  const getStatusClass = (status, dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    
    if (status === 'submitted') {
      return 'status-submitted';
    } else if (now > due) {
      return 'status-overdue';
    } else {
      return 'status-pending';
    }
  };
  
  return (
    <div>
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <div>
          <span>Welcome, {userData.name}!</span>
          <button onClick={onLogout} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/student/dashboard">Dashboard</Link></li>
          <li><Link to="/student/edit-profile">Edit Profile</Link></li>
        </ul>
      </nav>
      
      <div className="dashboard-content">
        <div className="card">
          <h2 className="card-title">Personal Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Course:</strong> {userData.course}</p>
          <p><strong>Year:</strong> {userData.year}</p>
          <Link to="/student/edit-profile" className="btn btn-primary">Edit Profile</Link>
        </div>
        
        <h2>Assignments</h2>
        <div className="assignments-list">
          {assignments.map(assignment => {
            const statusClass = getStatusClass(assignment.status, assignment.dueDate);
            
            return (
              <div key={assignment.id} className="assignment-card">
                <h3>{assignment.title}</h3>
                <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                <p><strong>Status:</strong> <span className={`status ${statusClass}`}>{assignment.status}</span></p>
                
                {assignment.status === 'submitted' ? (
                  <div>
                    <p><strong>Submitted:</strong> {assignment.submissionDate}</p>
                    {assignment.grade !== null && (
                      <p><strong>Grade:</strong> {assignment.grade}/100</p>
                    )}
                    {assignment.feedback && (
                      <div>
                        <p><strong>Feedback:</strong></p>
                        <p>{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={`/student/submit-assignment/${assignment.id}`} className="btn btn-primary">Submit Assignment</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;