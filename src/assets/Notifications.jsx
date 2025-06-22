import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New assignment has been posted.', date: '2024-10-04' },
    { id: 2, message: 'Your project submission has been reviewed.', date: '2024-10-03' },
    { id: 3, message: 'Meeting scheduled for next week.', date: '2024-10-02' },
  ]);

  useEffect(() => {
    const fetchJobNotifications = async () => {
      try {
        // Replace with actual API URL and credentials when you have the API key
        const response = await axios.get('https://api.indeed.com/ads/apisearch', {
          params: {
            publisher: 'YOUR_API_KEY',  // Replace with your Indeed API key
            q: 'intern',                // You can change the query here to fetch other job types
            l: 'remote',                // Location filter (you can modify this)
            format: 'json',
          }
        });

        // Simulating response data for job listings
        const jobNotifications = response.data.results.map((job, index) => ({
          id: `job-${index + 1}`,
          message: `New job posted: ${job.jobtitle} at ${job.company}`,
          date: new Date(job.date).toLocaleDateString(), // Assuming job.date is available
        }));

        // Combine hardcoded notifications and job notifications
        const allNotifications = [...notifications, ...jobNotifications];

        // Sort the notifications by date (ascending order)
        allNotifications.sort((a, b) => new Date(a.date) - new Date(b.date));

        setNotifications(allNotifications); // Set the notifications state

        // Save the number of notifications in localStorage
        localStorage.setItem('notificationCount', allNotifications.length);
      } catch (error) {
        console.error('Error fetching job data from Indeed:', error);
      }
    };

    // Fetch job notifications on component mount
    fetchJobNotifications();

    // Optional: Fetch contests or other data
    const fetchContestsData = async () => {
      try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const allContests = response.data.result;

        const now = new Date();
        const currentMonth = now.getMonth(); // Get current month (0-11)
        const currentYear = now.getFullYear(); // Get current year

        // Calculate the date 1 month from now
        const oneMonthFromNow = new Date(now);
        oneMonthFromNow.setMonth(now.getMonth() + 1); // Adding 1 month

        // Filter contests that are scheduled within the next month
        const upcomingContests = allContests.filter((contest) => {
          const contestDate = new Date(contest.startTimeSeconds * 1000); // Convert timestamp to Date
          return (
            contestDate.getFullYear() === currentYear && // Check if it's the current year
            contestDate.getMonth() >= currentMonth && // Check if contest is in the current month or in the next month
            contestDate <= oneMonthFromNow && // Contest should be within the next 1 month
            (contest.phase === 'BEFORE' || contest.phase === 'CODING') // Ongoing or upcoming contest
          );
        });

        // Format the contests as notifications
        const contestNotifications = upcomingContests.map((contest) => ({
          id: `contest-${contest.id}`, // Unique id based on contest id
          message: `Upcoming contest: ${contest.name} on ${new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}`,
          date: new Date(contest.startTimeSeconds * 1000).toLocaleDateString(),
        }));

        // Combine hardcoded notifications and contest notifications
        const allNotificationsWithContests = [...notifications, ...contestNotifications];

        // Sort the notifications by date (ascending order)
        allNotificationsWithContests.sort((a, b) => new Date(a.date) - new Date(b.date));

        setNotifications(allNotificationsWithContests); // Set the notifications state

        // Save the number of notifications in localStorage
        localStorage.setItem('notificationCount', allNotificationsWithContests.length);

      } catch (error) {
        console.error('Error fetching contests data:', error);
      }
    };

    fetchContestsData(); // Fetch contests when the component mounts
  }, []); // Empty dependency array ensures the effect only runs once after the initial render

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span>{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
