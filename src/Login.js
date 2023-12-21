import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve email and password from local storage when the component mounts
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      // You can skip the login form and navigate directly to the home page
      navigate("/home");
    }
  }, []);

  const handleLogin = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (email === "") {
      setError("Please Enter Your Email ID");
    } else if (!emailRegex.test(email)) {
      setError("Please Enter a Valid Email Address");
    } else if (password === "") {
      setError("Please Enter Your Password");
    } else if (password.length < 6) {
      setError("Password should be at least 6 characters long");
    } else {
      try {
        const response = await axios.post("http://192.168.1.37:4005/admin/login", {
          email,
          password,
        });

        if (response.status === 200) {
          // Save email and password to local storage immediately
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          // If the login is successful, navigate to the home page
          navigate("/home");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("An error occurred while logging in.");
      }
    }
  };

  return ( 
    <div className="login-container">
      <div className="login-form">
        <h1 className="loginh1">Admin</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="loginbutton" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
