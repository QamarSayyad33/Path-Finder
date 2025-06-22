import React, { useState } from 'react';
import './Settings.css'; // Ensure you have appropriate styling in this file

function Settings() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [accountEmail, setAccountEmail] = useState('user@example.com');
  const [language, setLanguage] = useState('English');
  const [profilePicture, setProfilePicture] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleEmailChange = (e) => {
    setAccountEmail(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? 'light' : 'dark'); // Toggle theme
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Logic to save settings (e.g., API call)
    alert('Settings saved!');
  };

  return (
    <div className={`settings-container ${theme}`}>
      <h1>Settings</h1>
      <form onSubmit={handleSaveSettings}>
        <div className="setting-item">
          <label>Theme:</label>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="setting-item">
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enable Notifications
          </label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationChange}
          />
        </div>
        <div className="setting-item">
          <label>Email:</label>
          <input
            type="email"
            value={accountEmail}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="setting-item">
          <label>Language:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>
        <div className="setting-item">
          <label>Privacy Settings:</label>
          <select value={privacy} onChange={handlePrivacyChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
            Enable Dark Mode
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
