import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddStudent = ({ userData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to add a student
    console.log('Adding student:', formData);
    
    // Simulate success
    setSuccess('Student added successfully!');
    setFormData({
      name: '',
      email: '',
      password: '',
      course: '',
      year: ''
    });
    
    // In a real app, you might redirect back to the dashboard after a delay
    setTimeout(() => {
      navigate('/teacher/dashboard');
    }, 2000);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Add New Student</h1>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/teacher/dashboard">Dashboard</Link></li>
          <li><Link to="/teacher/add-student">Add Student</Link></li>
          <li><Link to="/teacher/create-assignment">Create Assignment</Link></li>
        </ul>
      </nav>
      
      <div className="form-container">
        <h2>Student Details</h2>
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Course:</label>
            <input 
              type="text" 
              name="course" 
              value={formData.course} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Year:</label>
            <input 
              type="number" 
              name="year" 
              value={formData.year} 
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/teacher/dashboard" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
