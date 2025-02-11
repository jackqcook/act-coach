import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
            >
              Test Prep
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-gray-900 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-900 hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/test" 
                  className="text-gray-900 hover:text-primary transition-colors"
                >
                  Practice Tests
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-900 hover:text-primary transition-colors"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="btn btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;