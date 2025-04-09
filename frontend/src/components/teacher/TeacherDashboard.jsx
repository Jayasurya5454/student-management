import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = ({ userData, onLogout }) => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  // Mock data initialization
  useEffect(() => {
    // In a real app, this would be an API call
    setStudents([
      { id: 1, name: 'Jane Smith', email: 'student@example.com', course: 'Computer Science', year: 2 },
      { id: 2, name: 'Mike Johnson', email: 'mike@example.com', course: 'Computer Science', year: 3 },
      { id: 3, name: 'Sara Williams', email: 'sara@example.com', course: 'Information Systems', year: 1 }
    ]);
    
    setAssignments([
      { 
        id: 1, 
        title: 'React Basics', 
        description: 'Create a simple React app with components', 
        dueDate: '2025-04-25',
        submissions: [{ studentId: 1, status: 'submitted', submissionDate: '2025-04-10' }]
      },
      { 
        id: 2, 
        title: 'Database Design', 
        description: 'Design a database schema for an e-commerce website', 
        dueDate: '2025-05-05',
        submissions: []
      }
    ]);
  }, []);
  
  return (
    <div>
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div>
          <span>Welcome, {userData.name}!</span>
          <button onClick={onLogout} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/teacher/dashboard">Dashboard</Link></li>
          <li><Link to="/teacher/add-student">Add Student</Link></li>
          <li><Link to="/teacher/create-assignment">Create Assignment</Link></li>
        </ul>
      </nav>
      
      <div className="dashboard-content">
        <div className="card">
          <h2 className="card-title">Students</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="card">
          <h2 className="card-title">Assignments</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Submissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(assignment => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{assignment.dueDate}</td>
                  <td>{assignment.submissions.length} / {students.length}</td>
                  <td>
                    <Link to={`/teacher/assignment-feedback/${assignment.id}`} className="btn btn-primary" style={{ marginRight: '5px' }}>View Submissions</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;