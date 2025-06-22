import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Credits.css';

function Credits() {
  const [credits, setCredits] = useState(0); // Initialize credits
  const [subjectScores, setSubjectScores] = useState({}); // Initialize empty object for scores
  const [error, setError] = useState(null); // For handling any potential errors

  // Fetch scores from backend API on component mount
  useEffect(() => {
    const fetchSubjectScores = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token for authentication

        // Make the API request to fetch subject scores
        const response = await axios.get('http://localhost:5001/api/marks/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assume API returns { userMarks: [{ subname: 'math', marks1: 30, marks2: 28 }, { subname: 'science', marks1: 25, marks2: 30 }] }
        const scores = response.data.userMarks.reduce((acc, mark) => {
          // Calculate the average of marks1 and marks2 for each subject (out of 30)
          const avgScore = (Number(mark.marks1) + Number(mark.marks2)) / 2;
          acc[mark.subname] = avgScore; // Store the average score for each subject
          return acc;
        }, {});

        setSubjectScores(scores); // Update state with scores
        calculateCredits(scores); // Calculate credits based on scores

      } catch (error) {
        console.error('Error fetching subject scores:', error);
        setError('Failed to load subject scores');
      }
    };

    fetchSubjectScores();
  }, []);

  // Function to calculate credits based on subjectScores
  const calculateCredits = (scores) => {
    const totalCredits = Object.values(scores).reduce((acc, score) => acc + score, 0);
    const totalSubjects = Object.keys(scores).length;
    // Calculate the average of the credits score
    setCredits(totalCredits / totalSubjects || 0); // Just the average without dividing by 10
  };

  const handleScoreChange = (subject, score) => {
    const updatedScores = { ...subjectScores, [subject]: score };
    setSubjectScores(updatedScores);
    calculateCredits(updatedScores);
  };

  return (
    <div className="credits-container">
      <h1>Your Credits Score</h1>
      
      {/* Progress Bar based on 30 */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(credits / 30) * 100}%` }} // Scale progress bar to 100% for max score of 30
        >
          {credits.toFixed(2)} / 30
        </div>
      </div>

      <p>Your current progress: {credits.toFixed(2)} / 30</p>

      {error && <p className="error-message">{error}</p>}

      <h2>Enter Scores for Subjects</h2>
      {Object.keys(subjectScores).map((subject) => (
        <div key={subject}>
          <label>{subject.charAt(0).toUpperCase() + subject.slice(1)} Score: </label>
          <input
            type="number"
            value={subjectScores[subject]}
            onChange={(e) => handleScoreChange(subject, Number(e.target.value))}
            max="30"
            min="0"
          />
        </div>
      ))}

      <div className="feedback-message">
        {credits >= 24
          ? 'Excellent Work!'
          : credits >= 15
          ? 'Good Job! Keep Improving!'
          : 'You need to work harder!'}
      </div>
    </div>
  );
}

export default Credits;
