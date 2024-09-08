import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCloseAlert = () => {
    setErrorMessage("");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^[^*\/#-]*$/;
    return regex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email format.");
        return;
      }

    
      if (!validatePassword(password)) {
        setErrorMessage(
          "Invalid password format. Password cannot contain *, /, -, or #."
        );
        return;
      }

      const response = await fetch("http://localhost:3001/auth/login", {
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
        if (response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else if (response.status === 404) {
          setErrorMessage("Email not found.");
        } else {
          setErrorMessage("Failed to login user.");
        }
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("user", JSON.stringify(data));

      localStorage.setItem("access_token", data.access_token);

      const accessToken = localStorage.getItem("access_token");
      console.log("Access token:", accessToken);
      window.location.href = "/SecurePage";
    } catch (error) {
      console.error("Failed to login user:", error.message);
      setErrorMessage("Failed to login user.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleLogin} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              {errorMessage && (
                <div
                  className="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseAlert}
                  >
                    <span>&times;</span>
                  </button>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New Here?</h3>
              <p>
                Welcome! If you're new here, you're in for a treat. Join our
                vibrant community and start exploring. Don't have an account
                yet? You can register right here!
              </p>
              <Link to="/register">
                <button className="btn transparent" id="sign-up-btn">
                  Sign Up
                </button>
              </Link>
            </div>
            <img
              src={require("../Assets/log.svg").default}
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
