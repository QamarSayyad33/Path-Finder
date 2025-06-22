// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home() {
  const [credits, setCredits] = useState(0); 
  const [contests, setContests] = useState(0); 
  const [alerts, setAlerts] = useState(0); 
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
   
    const storedCredits = localStorage.getItem('credits');
    if (storedCredits) {
      setCredits(Math.round(storedCredits));
    }

    // Fetch marks data from backend
    const fetchMarksData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No access token found.');
          return;
        }

        const response = await axios.get('http://localhost:5001/api/marks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const marks = response.data.userMarks;

        
        const chartData = marks.map((mark) => ({
          name: mark.subname.slice(0, 3),  
          mid1: mark.marks1,              
          mid2: mark.marks2,               
        }));

        setMarksData(chartData);
      } catch (err) {
        setError('Failed to fetch marks data');
        console.error('Error fetching marks data:', err);
      }
    };

    // Fetch contests data
    const fetchContestsData = async () => {
      try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const allContests = response.data.result;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthlyContests = allContests.filter((contest) => {
          const contestDate = new Date(contest.startTimeSeconds * 1000);
          return (
            contestDate.getMonth() === currentMonth &&
            contestDate.getFullYear() === currentYear &&
            (contest.phase === 'BEFORE' || contest.phase === 'CODING')
          );
        });

        setContests(monthlyContests.length);
      } catch (err) {
        setError('Failed to fetch contests data');
        console.error('Error fetching contests data:', err);
      }
    };

    // Retrieve the notification count from localStorage
    const notificationCount = localStorage.getItem('notificationCount');
    if (notificationCount) {
      setAlerts(Number(notificationCount)); // Set the alerts state
    }

    fetchMarksData();
    fetchContestsData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>CREDITS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{credits}/30</h1> {/* Display credits in credits/30 format */}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CONTESTS THIS MONTH</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{contests}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CLASSES ATTENDED</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>
            33<span style={{ fontSize: '0.6em', color: 'gray' }}>(Coming Soon)</span>
          </h1> {/* Show "Coming Soon" in smaller text inside brackets */}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{alerts}</h1>
        </div>
      </div>

      <div className="charts">
        {marksData.length > 0 ? (
          <>
            {/* Bar chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marksData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mid1" fill="#8884d8" />
                <Bar dataKey="mid2" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            {/* Line chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marksData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mid1" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="mid2" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p>No data available for charts.</p>
        )}
      </div>
    </main>
  );
}

export default Home;
