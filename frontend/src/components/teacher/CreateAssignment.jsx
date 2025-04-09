import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateAssignment = ({ userData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalPoints: 100
  });
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
    
    // In a real app, this would be an API call to create an assignment
    console.log('Creating assignment:', formData);
    
    // Simulate success
    setSuccess('Assignment created successfully!');
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      totalPoints: 100
    });
    
    // In a real app, you might redirect back to the dashboard after a delay
    setTimeout(() => {
      navigate('/teacher/dashboard');
    }, 2000);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Create New Assignment</h1>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/teacher/dashboard">Dashboard</Link></li>
          <li><Link to="/teacher/add-student">Add Student</Link></li>
          <li><Link to="/teacher/create-assignment">Create Assignment</Link></li>
        </ul>
      </nav>
      
      <div className="form-container">
        <h2>Assignment Details</h2>
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Due Date:</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Total Points:</label>
            <input 
              type="number" 
              name="totalPoints" 
              value={formData.totalPoints} 
              onChange={handleChange}
              required
              min="0"
              max="100"
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/teacher/dashboard" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Create Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;