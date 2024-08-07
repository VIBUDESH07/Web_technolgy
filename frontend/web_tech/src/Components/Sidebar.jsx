// src/Components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt, FaHome, FaSyncAlt, FaPlus, FaUserShield } from 'react-icons/fa';
import '../Styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink exact to="/login" activeClassName="active">
            <FaSignInAlt className="nav-icon" /> Login
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/" activeClassName="active">
            <FaHome className="nav-icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/update" activeClassName="active">
            <FaSyncAlt className="nav-icon" /> Update
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add" activeClassName="active">
            <FaPlus className="nav-icon" /> Add
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/super" activeClassName="active">
            <FaUserShield className="nav-icon" /> Super Admin Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
