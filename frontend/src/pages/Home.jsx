import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Load Testing</h1>
      <p>Let's start!</p>
      <Link to="/submit_test">
        <button className="new-test-button">New Test</button>
      </Link>
    </div>
  );
};

export default Home;
