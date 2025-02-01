import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
            <li>Details</li>
            <li>Posts</li>
            <li>Contacts</li>
            <li>Improve</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="profile-summary">
          <div className="profile-card">
            <img src="path/to/profile.jpg" alt="Profile" />
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
            <div className="connections">
              <p>{profile.connections} Connections</p>
              <p>{profile.views} Views</p>
            </div>
          </div>
          <div className="stats">
            <h3>My Stats</h3>
            <p>{profile.views} Views</p>
            <p>{profile.visitors} Visitors</p>
            {/* Add a chart or graph here */}
          </div>
        </div>
        <section className="summary">
          <h3>Summary</h3>
          <p>{profile.summary}</p>
        </section>
        <section className="experience">
          <h3>Experience</h3>
          <p>{profile.experience}</p>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;