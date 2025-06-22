import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewQuestions.css';

function InterviewQuestions() {
  const [interviewData, setInterviewData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5001/api/questions')
      .then((response) => {
        const data = response.data.questions;

        // Group questions by company and include experience
        const groupedData = data.reduce((acc, { companyname, question, experience }) => {
          if (!acc[companyname]) {
            // Initialize a company entry if it doesn't exist
            acc[companyname] = { questions: [], experience: experience || '' };
          }
          // Add question to the company's question list
          acc[companyname].questions.push(question);
          // Set or update the experience (assuming all questions for a company have the same experience)
          acc[companyname].experience = experience || acc[companyname].experience;
          return acc;
        }, {});

        setInterviewData(groupedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError('Failed to load interview questions.');
        setLoading(false);
      });
  }, []); // The empty array ensures this runs only once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="interview-questions-container">
      <h1>Company-Wise Important Interview Questions</h1>
      {Object.entries(interviewData).map(([company, { questions, experience }]) => (
        <div key={company} className="company-section">
          <h2>{company}</h2>
          <h3>Questions:</h3>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          ) : (
            <p>No questions available for this company.</p>
          )}
          <h3>Candidate Experience:</h3>
          <p>{experience}</p>
        </div>
      ))}
    </div>
  );
}

export default InterviewQuestions;
