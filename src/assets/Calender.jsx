import React, { useEffect, useState } from 'react';
import './assets/Calendar.css';

function Calendar() {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth()); // Default to current month
    const [year, setYear] = useState(today.getFullYear()); // Default to current year
    const [contests, setContests] = useState([]);

    // Fetch contests from Codeforces API
    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('https://codeforces.com/api/contest.list');
                const data = await response.json();
                if (data.status === 'OK') {
                    setContests(data.result);
                }
            } catch (error) {
                console.error('Failed to fetch contests:', error);
            }
        };

        fetchContests();
    }, []);

    // Helper to get the number of days in the selected month and year
    const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();

    // Filter contests for the current month and year
    const contestsByDay = contests.reduce((acc, contest) => {
        const contestDate = new Date(contest.startTimeSeconds * 1000);
        if (contestDate.getMonth() === parseInt(month) && contestDate.getFullYear() === parseInt(year)) {
            const day = contestDate.getDate();
            if (!acc[day]) acc[day] = [];
            acc[day].push(contest);
        }
        return acc;
    }, {});

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className="calendar">
            <h2>Programming Contests </h2>
            <div className="selector">
                <label htmlFor="month">Month:</label>
                <select id="month" value={month} onChange={handleMonthChange}>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>

                <label htmlFor="year">Year:</label>
                <select id="year" value={year} onChange={handleYearChange}>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>

            <div className="calendar-grid">
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const dayContests = contestsByDay[day] || [];
                    return (
                        <div key={day} className="calendar-cell">
                            <div className="day-number">{day}</div>
                            {dayContests.length > 0 ? (
                                <ul className="contest-list">
                                    {dayContests.map((contest) => (
                                        <li key={contest.id} className="contest-item">
                                            <span>{contest.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-contest">No Contest</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
