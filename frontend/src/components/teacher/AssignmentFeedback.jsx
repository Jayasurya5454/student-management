import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const AssignmentFeedback = ({ userData }) => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Mock data initialization
  useEffect(() => {
    // In a real app, this would be an API call
    const mockAssignment = { 
      id: parseInt(id), 
      title: 'React Basics', 
      description: 'Create a simple React app with components', 
      dueDate: '2025-04-25',
      totalPoints: 100
    };
    
    const mockSubmissions = [
      {
        id: 1,
        assignmentId: parseInt(id),
        studentId: 1,
        studentName: 'Jane Smith',
        submissionDate: '2025-04-10',
        content: 'https://github.com/janesmith/react-basics',
        feedback: '',
        grade: null
      }
    ];
    
    setAssignment(mockAssignment);
    setSubmissions(mockSubmissions);
    
    // Initialize feedback state
    const initialFeedback = {};
    mockSubmissions.forEach(sub => {
      initialFeedback[sub.id] = {
        feedback: sub.feedback || '',
        grade: sub.grade || ''
      };
    });
    setFeedback(initialFeedback);
  }, [id]);

  const handleFeedbackChange = (submissionId, field, value) => {
    setFeedback(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  };

  const handleSubmitFeedback = (submissionId) => {
    // In a real app, this would be an API call to save the feedback
    console.log('Submitting feedback for', submissionId, feedback[submissionId]);
    
    // Update the submissions array with the new feedback
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { 
              ...sub, 
              feedback: feedback[submissionId].feedback, 
              grade: feedback[submissionId].grade 
            } 
          : sub
      )
    );
    
    setSuccessMessage(`Feedback submitted successfully for ${submissions.find(s => s.id === submissionId).studentName}!`);
    
    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Assignment Feedback</h1>
      </div>
      
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/teacher/dashboard">Dashboard</Link></li>
          <li><Link to="/teacher/add-student">Add Student</Link></li>
          <li><Link to="/teacher/create-assignment">Create Assignment</Link></li>
        </ul>
      </nav>
      
      <div className="card">
        <h2>{assignment.title}</h2>
        <p><strong>Due Date:</strong> {assignment.dueDate}</p>
        <p><strong>Description:</strong> {assignment.description}</p>
        <p><strong>Total Points:</strong> {assignment.totalPoints}</p>
      </div>
      
      {successMessage && (
        <div className="success-message" style={{ color: 'green', padding: '10px', margin: '10px 0', backgroundColor: '#e7f7e7', borderRadius: '4px' }}>
          {successMessage}
        </div>
      )}
      
      <h3>Submissions</h3>
      
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map(submission => (
          <div key={submission.id} className="card">
            <h4>{submission.studentName}</h4>
            <p><strong>Submitted:</strong> {submission.submissionDate}</p>
            <p><strong>Submission:</strong> <a href={submission.content} target="_blank" rel="noopener noreferrer">{submission.content}</a></p>
            
            <div className="form-group">
              <label>Feedback:</label>
              <textarea 
                value={feedback[submission.id]?.feedback || ''} 
                onChange={(e) => handleFeedbackChange(submission.id, 'feedback', e.target.value)}
                rows="4"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label>Grade (out of {assignment.totalPoints}):</label>
              <input 
                type="number" 
                value={feedback[submission.id]?.grade || ''} 
                onChange={(e) => handleFeedbackChange(submission.id, 'grade', e.target.value)}
                min="0"
                max={assignment.totalPoints}
              />
            </div>
            
            <button 
              onClick={() => handleSubmitFeedback(submission.id)} 
              className="btn btn-primary"
            >
              Submit Feedback
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AssignmentFeedback;
