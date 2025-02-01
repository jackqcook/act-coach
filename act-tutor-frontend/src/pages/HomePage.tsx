import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <main>
        <h2>Artificial Intelligence ACT tutoring designed to help YOU succeed</h2>
        <button className="browse-plans">Browse our plans</button>
        <div className="images">
          <img src="path/to/image1.jpg" alt="Student studying" />
          <img src="path/to/image2.jpg" alt="Study materials" />
        </div>
        <section className="about">
          <h3>About Us</h3>
          <p>
            We are a group of college kids majoring in Machine Learning and Artificial Intelligence...
          </p>
        </section>
        <div className="profile-section">
          <Link to="/profile" className="profile-link">Go to Profile</Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 