import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My App</h1>
      <div className="button-container">
        <Link to="/login" className="button">
          Sign In
        </Link>
        <Link to="/register" className="button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
