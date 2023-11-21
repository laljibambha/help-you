import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
