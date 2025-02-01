import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="main-navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Test Prep</Link>
      </div>
      <div className="navbar-right">
        <Link to="/practice">Practice Tests</Link>
        <Link to="/contact">Contact Us</Link>
        <button className="sign-in">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;