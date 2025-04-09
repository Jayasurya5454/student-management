import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  // Mock user data for demonstration
  const mockUsers = {
    teachers: [
      { id: 1, email: 'teacher@example.com', password: 'password123', name: 'John Doe' }
    ],
    students: [
      { id: 1, email: 'student@example.com', password: 'password123', name: 'Jane Smith', course: 'Computer Science', year: 2 }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let userData = null;
    
    if (role === 'teacher') {
      userData = mockUsers.teachers.find(user => user.email === email && user.password === password);
    } else {
      userData = mockUsers.students.find(user => user.email === email && user.password === password);
    }
    
    if (userData) {
      onLogin(role, userData);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Management System</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>
        Demo credentials:<br />
        Teacher: teacher@example.com / password123<br />
        Student: student@example.com / password123
      </p>
    </div>
  );
};

export default Login;