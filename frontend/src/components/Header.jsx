import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import './Header.css';
import SidebarIcon from '../images/sidebar.png';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    localStorage.clear();
    setUser({ username: '', email: '', address: '' });
    setShowSidebar(false);
    navigate('/home');
  };

  return (
    <>
      <header className="head">
        <Link to="/"><h1>🥘 MealMate</h1></Link>
        <p><i>Your Mealtime, Made Easy</i></p>

        <div>
          {user.username ? (
            <span className="welcome-text" onClick={toggleSidebar}>
              👋 Welcome, {user.username} <img src={SidebarIcon} alt="Sidebar Icon" className='sider'/>
            </span>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </header>

      {showSidebar && (
        <div className="sidebar open">
          <button className="close-btn" onClick={toggleSidebar}>×</button>
          <h3>User Info</h3>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Header;
