import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Service from './components/Service';
import User from './components/User';
import Category from './components/Category';
import './App.css';
import SubCategory from './components/Sub_Category';
import Product from './components/Product';
import Order from './components/Order';
import Help from './components/Help';

function App() {
  const themeRef = useRef('light');

  const toggleTheme = () => {
    const newTheme = themeRef.current === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(themeRef.current);
    document.documentElement.classList.add(newTheme);
    themeRef.current = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      themeRef.current = savedTheme;
      document.documentElement.classList.add(savedTheme);
    }
  };

  initializeTheme();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home toggleTheme={toggleTheme} theme={themeRef.current} />}
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
