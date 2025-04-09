import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SubmitAssignment = ({ userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [formData, setFormData] = useState({
    submissionLink: '',
    comments: ''
  });
  const [success, setSuccess] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setAssignment({ 
      id: parseInt(id), 
      title: id === '1' ? 'React Basics' : 'Database Design', 
      description: id === '1' 
        ? 'Create a simple React app with components' 
        : 'Design a database schema for an e-commerce website', 
      dueDate: id === '1' ? '2025-04-25' : '2025-05-05',
      totalPoints: 100
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate submission
    console.log('Submitting assignment:', formData);
    
    // Mark as completed
    setCompleted(true);
    setSuccess('Assignment submitted successfully!');
    
    // Redirect after a delay
    setTimeout(() => {
      navigate('/student/dashboard');
    }, 2000);
  };

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Submit Assignment</h1>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/student/dashboard">Dashboard</Link></li>
          <li><Link to="/student/edit-profile">Edit Profile</Link></li>
        </ul>
      </nav>
      
      <div className="card">
        <h2>{assignment.title}</h2>
        <p><strong>Due Date:</strong> {assignment.dueDate}</p>
        <p><strong>Description:</strong> {assignment.description}</p>
        <p><strong>Total Points:</strong> {assignment.totalPoints}</p>
        {completed && <p style={{ color: 'green', fontWeight: 'bold' }}>Status: Completed</p>}
      </div>
      
      <div className="form-container">
        <h2>Submit Your Work</h2>
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}
        
        {!completed && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Solutions:</label>
              <textarea 
                name="comments" 
                value={formData.comments} 
                onChange={handleChange}
                placeholder="Any additional information you'd like to share about your submission"
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/student/dashboard" className="btn btn-secondary">Cancel</Link>
              <button type="submit" className="btn btn-primary">Submit Assignment</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitAssignment;


