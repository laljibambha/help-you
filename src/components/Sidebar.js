// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaHome , FaUser, } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GrServices } from "react-icons/gr";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Your logo or any other content */}
      </div>
      <ul className="menu">
        <li>
          <Link to="/home/dashboard">
            <FaHome className="icon"/>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/home/service">
            <GrServices className="icon"/>
            Service
          </Link>
        </li>
        <li>
          <Link to="/home/user">
            <FaUser className="icon"/>
            User
          </Link>
        </li>
        <li>
          <Link to="/home/category">
            <BiSolidCategory  className="icon"/>
            Category
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
