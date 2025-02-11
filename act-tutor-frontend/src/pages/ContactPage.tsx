import React from 'react';
import jackCookImage from '../assets/Jack_Cook.jpg';
import nathanRobertsImage from '../assets/Nathan_Roberts.jpeg';
import mattbeckstrandImage from '../assets/Matt_Beckstrand.jpeg';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">FOUNDERS</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <img 
              src={jackCookImage} 
              alt="Jack Cook" 
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Jack Cook</h2>
            <h3 className="text-lg text-gray-600 mb-6">Co-Founder</h3>
            <button className="btn btn-primary">
              VIEW BIO →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <img 
              src={nathanRobertsImage} 
              alt="Nathan Roberts" 
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nathan Roberts</h2>
            <h3 className="text-lg text-gray-600 mb-6">Co-Founder</h3>
            <button className="btn btn-primary">
              VIEW BIO →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center lg:col-start-2">
            <img 
              src={mattbeckstrandImage} 
              alt="Matt Beckstrand" 
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Matt Beckstrand</h2>
            <h3 className="text-lg text-gray-600 mb-6">Co-Founder</h3>
            <button className="btn btn-primary">
              VIEW BIO →
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We are a group of college students majoring in Machine Learning and Artificial Intelligence
              who saw an opportunity to make standardized test preparation more accessible and effective.
              Our vision for this project started when we were discussing how we could use AI to make
              a difference in the learning process for as many people as possible.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why ACT Tutoring?</h2>
            <p className="text-gray-700 leading-relaxed">
              We decided to start by perfecting an ACT tutoring website/app designed to help people "beat" the ACT.
              Our AI-powered platform provides personalized learning experiences, adapting to each student's
              strengths and areas for improvement. We believe that quality test preparation should be
              accessible to everyone, not just those who can afford expensive private tutoring.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Future Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We plan on expanding into other standardized tests such as LSAT, GMAT, and more.
              With that being said, we are continually iterating on this project and want to
              provide you with the best experience possible.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            We value your feedback and are constantly working to improve our platform.
            Whether you have suggestions, questions, or just want to share your experience,
            we'd love to hear from you!
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <a 
                href="mailto:jackqcook@gmail.com" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                jackqcook@gmail.com
              </a>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage; 