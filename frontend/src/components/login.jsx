// frontend/src/components/Login.js

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './userInfo.css';
import { UserContext } from "../context/UserContext";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // update context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    try {
      const response = await axios.post('http://localhost:5555/api/login', {
        email,
        password,
      });
      
      const { token, username, address, userId } = response.data; // ✅ fix destructuring
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ userId })); // ✅ fix here
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('address', address || '');
      localStorage.setItem('isLoggedIn', 'true');
      

      // Update global context
      setUser({
        username,
        email,
        address: address || '',
        isLoggedIn: true,
      });

      alert("Login successful!");
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="center-wrapper">
      <div className="form-box">
        <h2>Log In</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
