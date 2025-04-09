import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    course: userData.course || '',
    year: userData.year || ''
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
    
    // In a real app, this would be an API call to update the user's profile
    console.log('Updating profile:', formData);
    
    // Update the user data in the parent component
    setUserData({
      ...userData,
      ...formData
    });
    
    // Show success message
    setSuccess('Profile updated successfully!');
    
    // Navigate back to dashboard after a delay
    setTimeout(() => {
      navigate('/student/dashboard');
    }, 2000);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Edit Profile</h1>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/student/dashboard">Dashboard</Link></li>
          <li><Link to="/student/edit-profile">Edit Profile</Link></li>
        </ul>
      </nav>
      
      <div className="form-container">
        <h2>Personal Information</h2>
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}
        
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
              disabled
            />
            <small>Email cannot be changed</small>
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
            <Link to="/student/dashboard" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
