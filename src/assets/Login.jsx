import React, { useState } from 'react';
import './Login.css'; 
import backgroundVideo from './istockphoto-1169646211-640_adpp_is.mp4'; 
import axios from 'axios'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous error message
    setError('');

    try {
      // Send a POST request to the backend to validate login credentials
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      // Log the response for debugging
      console.log(response);

      // If login is successful, we get the JWT token
      const { accessToken } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', accessToken);

      // Trigger the onLogin function passed from the parent component
      onLogin(); // This can be used to update the UI after login, like redirecting to a dashboard

      alert('Login successful!');
    } catch (error) {
      // If there's an error, show a message to the user
      setError('Invalid credentials');
      console.error(error.response ? error.response.data : error);
    }
  };

  return (
    <div className="login-container">
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-form">
        <h1>Path Finder!</h1>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-message">{error}</p>} 
      </div>
    </div>
  );
}

export default Login;
