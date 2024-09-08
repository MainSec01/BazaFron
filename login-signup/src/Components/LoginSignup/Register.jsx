import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage(""); 

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Invalid password format. It should contain * / -");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        
        const errorResponse = await response.json();
        if (
          response.status === 400 &&
          errorResponse.message === "User already exists"
        ) {
          throw new Error(
            "User already exists. Please try signing in instead."
          );
        } else {
          throw new Error(
            errorResponse.message ||
              "Failed to register user. Please try again later."
          );
        }
      }

      const message = await response.json();
      console.log("Registration successful:", message);
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to register user:", error.message);
      setErrorMessage(error.message);
    }
  };

  const validateEmail = (email) => {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
   
    const regex = /^[^*\/#-]*$/;
    return regex.test(password);
  };

  return (
    <div>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleRegister} className="sign-in-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Sign Up" className="btn solid" />
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome Back!</h3>
              <p>
                Welcome back! We're thrilled to have you here again. Your
                presence adds vibrancy to our community. Let's pick up where we
                left off and continue exploring together.
              </p>
              <Link to="/login">
                <button className="btn transparent" id="sign-up-btn">
                  Sign in
                </button>
              </Link>
            </div>
            <img
              src={require("../Assets/register.svg").default}
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
