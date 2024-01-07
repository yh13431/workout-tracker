import React from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Workout Tracker</h1>
        <p>Start tracking your workouts today!</p>
        <Link className="hero-link" to="/login">Get Started</Link>
      </div>
    </div>
  );
}

export default Hero;
