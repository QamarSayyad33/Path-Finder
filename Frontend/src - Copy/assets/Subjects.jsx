import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subjects.css';

function Subjects() {
  const [marks, setMarks] = useState([]);  // State to store marks
  const [error, setError] = useState('');  // State to store error messages

  useEffect(() => {
    // Fetch marks data when the component mounts
    const fetchMarks = async () => {
      try {
        console.log("Fetching token...");

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Token retrieved:", token);  // Log the token (can be null if not found)

        if (!token) {
          setError('No access token found.');
          return;
        }

        // Send GET request to fetch marks
        console.log("Sending GET request to fetch marks with token...");

        const response = await axios.get('http://localhost:5001/api/marks/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data fetched successfully:", response.data);  // Log the response data

        // Set the marks data from the response
        setMarks(response.data.userMarks);

      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error while fetching data:', err);  // Log any error that occurred
      }
    };

    fetchMarks();
  }, []);  // Empty dependency array to run only once when the component mounts

  return (
    <div className="subjects-container">
      <h1>Marks List</h1>
      
      {error && <p className="error-message">{error}</p>}  {/* Display error message if there is one */}

      <table className="subjects-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Marks 1</th>
            <th>Marks 2</th>
          </tr>
        </thead>
        <tbody>
          {marks.length > 0 ? (
            marks.map((mark) => (
              <tr key={mark._id}>
                <td><a href="https://drive.google.com/file/d/1JrzbwFTODVJDiHS6sRevX7Swh5AUPBay/view?usp=drive_link" target="_blank">{mark.subname}</a></td>
                <td>{mark.marks1}</td>  {/* Display marks1 */}
                <td>{mark.marks2}</td>  {/* Display marks2 */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No marks available.</td>  {/* Adjust colSpan to 3 */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Subjects;
