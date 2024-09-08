import React from "react";
// import { Navigate } from "react-router-dom";
import "./SecurePage.css";

const SecurePage = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    console.log("Access token not found. Redirecting to login...");
    window.location.href = "/login";
  }

  const handleLogout = () => {
    console.log("Logging out..."); 
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="secure-container">
      <h1>Secure Page</h1>
      <div className="logout-container">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default SecurePage;
