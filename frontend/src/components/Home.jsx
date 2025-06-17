import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bread from '../images/bread.jpg';
import pizza from '../images/pizza.jpg';
import cake from '../images/cake.jpg';

function Home() {
  const name = localStorage.getItem("username");

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="home-tagline">"Savor the Goodness, Simplify Your Meals"</h2>
        <p className="home-quote">
          &ldquo;Let food be thy medicine and medicine be thy food.&rdquo; - Hippocrates
        </p>
      </header>

      <section className="home-hero-section">
        <img
          src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Healthy Meal Prep"
          className="home-hero-image"
        />
        <div className="home-hero-content">
          <h1 className="home-main-heading">Welcome to MealMate</h1>
          <p className="home-hero-text">Your partner in delicious, stress-free meals.</p>
          <div className="home-cta-buttons">
            <Link to="/explore" className="home-btn home-explore-btn">
              Explore Recipes
            </Link>
            <Link to="/learn-more" className="home-btn home-learn-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features-section">
        <div className="home-feature-card">
          <img src={pizza} alt="Recipe Search" className="home-feature-image" />
          <h3>Find Your Inspiration</h3>
          <p>Discover a world of recipes tailored to your taste and dietary needs.</p>
        </div>
        <div className="home-feature-card">
          <img src={cake} alt="Meal Planning" className="home-feature-image" />
          <h3>Plan Your Week</h3>
          <p>Effortlessly organize your meals for the week and simplify your grocery shopping.</p>
        </div>
        <div className="home-feature-card">
          <img src={bread} alt="Favorite Recipes" className="home-feature-image" />
          <h3>Save Your Favorites</h3>
          <p>Keep your cherished recipes in one place for quick and easy access.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
