import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Service from "./components/Service";
import User from "./components/User";
import Category from "./components/Category";
import "./App.css";
import Sub_Category from "./components/Sub_Category";
import Product from "./components/Product";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // You can save the theme preference in local storage or use a more advanced state management solution
    // For simplicity, this example uses local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Retrieve the theme preference from local storage when the component mounts
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home toggleTheme={toggleTheme} theme={theme} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="service" element={<Service />} />
            <Route path="user" element={<User />} />
            <Route path="category" element={<Category />} />
            <Route path="sub_category" element={<Sub_Category />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
