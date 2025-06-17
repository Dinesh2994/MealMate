// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/signup';
import Login from './components/login';
import ExploreRecipes from './components/ExploreRecipes';
import Payment from './components/Payment';
import './styles/global.css';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<ExploreRecipes />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="*" element={<h2>404 - Page not found</h2>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
