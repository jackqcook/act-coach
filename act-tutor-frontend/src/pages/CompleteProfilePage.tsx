import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import './CompleteProfilePage.scss'; // Create this file for your page-specific styles

const CompleteProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state for profile details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ensure a logged-in user is present (if not, redirect to /auth)
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Use upsert so that if the profile row already exists it gets updated; otherwise, it inserts a new row.
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user!.id, // Use the authenticated user's id as the primary key
        first_name: firstName,
        last_name: lastName,
        username: username,
        profile_completed: true,
      });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to home (or another dashboard page) upon success.
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="complete-profile-page">
      <h2>Complete Your Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfilePage; 