// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaHome, FaUser } from "react-icons/fa";
import { BiSolidCategory, BiLogoProductHunt } from "react-icons/bi";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import {
  MdProductionQuantityLimits,
  MdHomeRepairService,
} from "react-icons/md";
import "./Sidebar.css"; 

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">{/* Your logo or any other content */}</div>
      <ul className="menu">
        <li>
          <Link to="/home/dashboard">
            <FaHome className="icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/home/service">
            <MdHomeRepairService className="icon" />
            Service
          </Link>
        </li>
        <li>
          <Link to="/home/category">
            <BiSolidCategory className="icon" />
            Category
          </Link>
        </li>
        <li>
          <Link to="/home/sub_category">
            <PiArrowElbowDownRightBold className="icon" />
            Sub_Category
          </Link>
        </li>
        <li>
          <Link to="/home/product">
            <BiLogoProductHunt className="icon" />
            Product
          </Link>
        </li>
        <li>
          <Link to="/home/order">
            <MdProductionQuantityLimits className="icon" />
            Order
          </Link>
        </li>
        <li>
          <Link to="/home/user">
            <FaUser className="icon" />
            User
          </Link>
        </li>
        <li>
          <Link to="/home/help">
            <IoMdHelpCircleOutline className="icon" />
            Help
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
