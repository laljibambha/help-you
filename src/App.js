import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Service from "./components/Service";
import User from "./components/User";
import Category from "./components/Category";
import "./App.css";
import SubCategory from "./components/Sub_Category";
import Product from "./components/Product";
import Order from "./components/Order";
import Help from "./components/Help";

function App() {
  let theme = localStorage.getItem("theme") || "light";

  const toggleTheme = () => {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  document.documentElement.classList.add(theme);

  return (
    <Router>
      <div className="app">
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
            <Route path="sub_category" element={<SubCategory />} />
            <Route path="product" element={<Product />} />
            <Route path="order" element={<Order />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
