import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userInfo.css';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5555/api/signup', {
        name,
        email,
        password,
        address,
      });
      
      const userData = response.data; // ✅ ADD THIS LINE
      
      localStorage.setItem('username', name);
      localStorage.setItem('user', JSON.stringify({ userId: userData._id })); // ✅ fix here
      localStorage.setItem('email', email);
      localStorage.setItem('address', address);
      localStorage.setItem('isLoggedIn', 'true');
      

      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className='center-wrapper'>
      <div className='form-box'>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSignup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your name'/>
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required  placeholder='Enter your email'/>
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder='Enter your password'/>
          <br />
          <label htmlFor="address">Address:</label>
          <textarea id="address" rows="4" value={address} onChange={(e) => setAddress(e.target.value)} required  placeholder='Enter your address'></textarea>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;