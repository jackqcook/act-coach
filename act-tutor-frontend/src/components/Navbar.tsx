import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <nav className="main-navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Test Prep</Link>
      </div>
      <div className="navbar-right">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
        {user ? (
          <>
            <Link to="/test">Practice Tests</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <Link to="/auth">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;