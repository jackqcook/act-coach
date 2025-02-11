import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const { signOut, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/profile/1'); // Replace with dynamic user ID
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link 
                to="/test" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Practice
              </Link>
            </li>
            <li className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              Posts
            </li>
            <li className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              Contacts
            </li>
            <li className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              Improve
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80 bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col items-center">
            <img 
              src="path/to/profile.jpg" 
              alt="Profile" 
              className="w-32 h-32 rounded-full mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
            <p className="text-gray-600 mb-6">{profile.title}</p>
            
            <div className="flex justify-around w-full border-t border-gray-100 pt-6">
              <div className="text-center">
                <span className="block text-xl font-bold text-gray-900">{profile.connections}</span>
                <span className="text-sm text-gray-600">Connections</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-gray-900">{profile.views}</span>
                <span className="text-sm text-gray-600">Views</span>
              </div>
            </div>
          </div>
        </aside>
        
        <main className="flex-1 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">My Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{profile.views}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Visitors</span>
                  <span className="font-semibold text-gray-900">{profile.visitors}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Summary</h3>
              <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
            </div>
          </div>
          
          <section className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Experience</h3>
            <p className="text-gray-700 leading-relaxed">{profile.experience}</p>
          </section>

          <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-700">Welcome, <span className="font-medium">{user?.email}</span></p>
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;