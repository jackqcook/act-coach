import React from 'react';
import { Link } from 'react-router-dom';
// import actHellImage from '../assets/ACT_hell.jpg';
// import MetaverseImg from '../assets/meta_verse.jpg';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <main>
        <h2>Artificial Intelligence ACT tutoring designed to help YOU succeed</h2>
        <button className="browse-plans">Browse our plans</button>
        <div className="images">
          {/* <img src={actHellImage} alt="Student studying" />
          <img src={MetaverseImg} alt="Study materials" /> */}
        </div>
        <section className="about">
          <h3>About Us</h3>
          <p>
            Every year, students around the world cram for standardized tests. These test have become increasingly more important, often determining
            the college a student is able to attend. We know that studying for these tests can be stressful. Especially in a world where many parents are pouring
            thousands of dollars into to test preparation giving their kids a better chance at doing well. We believe that those who want to succeed should have tools available to help them succeed. 
            With recent advancements in large language models, we believe that everyone can have an on demand tutor for their standardized tests. With our thoughtful approach to helping students target their weaknesses,
            we believe we can help students prepare for and ace these tests. 
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