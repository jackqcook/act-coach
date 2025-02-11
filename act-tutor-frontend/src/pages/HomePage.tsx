import React from 'react';
import { Link } from 'react-router-dom';
import actHellImage from '../assets/ACT_hell.jpg';
import MetaverseImg from '../assets/meta_verse.jpg';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Artificial Intelligence ACT tutoring designed to help YOU succeed
          </h1>
          <Link 
            to="/plans" 
            className="btn btn-primary inline-block"
          >
            Browse our plans
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <img 
            src={actHellImage} 
            alt="Student studying" 
            className="rounded-lg shadow-lg w-full h-64 object-cover"
          />
          <img 
            src={MetaverseImg} 
            alt="Study materials" 
            className="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every year, students around the world cram for standardized tests. These tests have become 
            increasingly more important, often determining the college a student is able to attend. 
            We know that studying for these tests can be stressful. Especially in a world where many 
            parents are pouring thousands of dollars into test preparation giving their kids a better 
            chance at doing well. We believe that those who want to succeed should have tools available 
            to help them succeed. With recent advancements in large language models, we believe that 
            everyone can have an on-demand tutor for their standardized tests. With our thoughtful 
            approach to helping students target their weaknesses, we believe we can help students 
            prepare for and ace these tests.
          </p>
        </section>

        <div className="text-center mt-12">
          <Link 
            to="/profile" 
            className="btn btn-secondary"
          >
            Go to Profile
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 