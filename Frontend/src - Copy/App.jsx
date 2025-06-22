// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './assets/Header';
import Sidebar from './assets/Sidebar';
import Home from './assets/Home';
import Login from './assets/Login'; 
import BlankPage from './assets/BlankPage'; 
import SubjectsPage from './assets/Subjects'; 
import Notifications from './assets/Notifications';// Import the new SubjectsPage component
import Credits from './assets/Credits'
import InterviewQuestions from './assets/InterviewQuestions';
import Settings from './assets/Settings';


function App() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleLogin = () => {
        setIsLoggedIn(true); // Set logged-in state to true
    };

    return (
        <Router>
            <div className="grid-container">
                {isLoggedIn ? (
                    <>
                        <Header OpenSidebar={OpenSidebar} />
                        <Sidebar 
                            openSidebarToggle={openSidebarToggle} 
                            OpenSidebar={OpenSidebar} 
                        />
                        <Routes>
                            <Route path="/" element={<Home />} /> {/* Home page */}
                            <Route path="/contests" element={<BlankPage />} /> {/* Contests page */}
                            <Route path="/subjects" element={<SubjectsPage />} /> {/* Subjects page */}
                            <Route path="/notifications" element={<Notifications />} /> {/* Notifications page */}
                            <Route path="/credits" element={<Credits />} /> 
                            <Route path="/interview-questions" element={<InterviewQuestions />} />
                            <Route path="/Settings" element={<Settings />} /> 

                            
                        </Routes>
                    </>
                ) : (
                    <Login onLogin={handleLogin} /> // Render the Login component if not logged in
                )}
            </div>
        </Router>
    );
}

export default App;
