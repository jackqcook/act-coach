import React from 'react';
import jackCookImage from '../assets/Jack_Cook.jpg';
import nathanRobertsImage from '../assets/Nathan_Roberts.jpeg';
import mattbeckstrandImage from '../assets/Matt_Beckstrand.jpeg';
import './ContactPage.scss';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="founders-section">
        <h1>FOUNDERS</h1>
        <div className="founders-grid">
          <div className="founder-card">
            <img src={jackCookImage} alt="Jack Cook" />
            <h2>Jack Cook</h2>
            <h3>Co-Founder</h3>
            <button className="view-bio">VIEW BIO →</button>
          </div>

          <div className="founder-card">
            <img src={nathanRobertsImage} alt="Nathan Roberts" />
            <h2>Nathan Roberts</h2>
            <h3>Co-Founder</h3>
            <button className="view-bio">VIEW BIO →</button>
          </div>

          <div className="founder-card">
            <img src={mattbeckstrandImage} alt="Matt Beckstrand" />
            <h2>Matt Beckstrand</h2>
            <h3>Co-Founder</h3>
            <button className="view-bio">VIEW BIO →</button>
          </div>
        </div>
      </div>

      <div className="content-container">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are a group of college students majoring in Machine Learning and Artificial Intelligence
            who saw an opportunity to make standardized test preparation more accessible and effective.
            Our vision for this project started when we were discussing how we could use AI to make
            a difference in the learning process for as many people as possible.
          </p>
          
          <h2>Why ACT Tutoring?</h2>
          <p>
            We decided to start by perfecting an ACT tutoring website/app designed to help people "beat" the ACT.
            Our AI-powered platform provides personalized learning experiences, adapting to each student's
            strengths and areas for improvement. We believe that quality test preparation should be
            accessible to everyone, not just those who can afford expensive private tutoring.
          </p>

          <h2>Our Future Vision</h2>
          <p>
            We plan on expanding into other standardized tests such as LSAT, GMAT, and more.
            With that being said, we are continually iterating on this project and want to
            provide you with the best experience possible.
          </p>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            We value your feedback and are constantly working to improve our platform.
            Whether you have suggestions, questions, or just want to share your experience,
            we'd love to hear from you!
          </p>
          
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:jackqcook@gmail.com">jackqcook@gmail.com</a>
            </div>
            
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required></textarea>
                </div>
                
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage; 