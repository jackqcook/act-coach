import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api.service';
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
    try {
      await apiService.createProfile({
        id: user!.id,
        first_name: firstName,
        last_name: lastName,
        username: username,
        profile_completed: true,
      });
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
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