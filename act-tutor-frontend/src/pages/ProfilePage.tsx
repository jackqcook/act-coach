import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfilePage.scss';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/profile/1'); // Replace with dynamic user ID
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>My Profile</h1>
        <nav>
          <ul>
            <li><Link to="/test">Practice</Link></li>
            <li>Posts</li>
            <li>Contacts</li>
            <li>Improve</li>
          </ul>
        </nav>
      </header>
      <div className="profile-content">
        <aside className="profile-card">
          <img src="path/to/profile.jpg" alt="Profile" />
          <h2>{profile.name}</h2>
          <p className="title">{profile.title}</p>
          <div className="connections">
            <div className="connection-stat">
              <span className="stat-number">{profile.connections}</span>
              <span className="stat-label">Connections</span>
            </div>
            <div className="connection-stat">
              <span className="stat-number">{profile.views}</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="top-section">
            <div className="stats">
              <h3>My Stats</h3>
              <div className="stat-item">
                <span className="stat-label">Views</span>
                <span className="stat-value">{profile.views}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Visitors</span>
                <span className="stat-value">{profile.visitors}</span>
              </div>
              {/* Add more stats as needed */}
            </div>
            
            <div className="summary">
              <h3>Summary</h3>
              <p>{profile.summary}</p>
            </div>
          </div>
          
          <section className="experience">
            <h3>Experience</h3>
            <p>{profile.experience}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;