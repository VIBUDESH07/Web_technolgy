import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa'; // Importing home and search icons
import '../Styles/Header.css'; // Ensure this path is correct

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <FaHome />
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
        <Link to="/search">
        <FaSearch className="search-icon" />
        </Link>
      </div>
      <div className="navbar-links">
       
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
