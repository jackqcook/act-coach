import axios from 'axios';
import { supabase } from '../supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization token dynamically
api.interceptors.request.use(
  async (config) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token && config.headers) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
        console.log('Token being sent:', session.access_token); // Debug log
      } else {
        console.log('No session or token found'); // Debug log
      }
      return config;
    } catch (error) {
      console.error("Error getting session:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Handle Unauthorized Errors (Redirect to Login)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");
    //   await supabase.auth.signOut(); // Logout user
    //   window.location.href = '/auth'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// API Service
export const apiService = {
  getProfile: (userId: string) => 
    api.get(`/users/profile?user_id=${userId}`),
  
  createProfile: (profileData: any) => 
    api.post('/users/profile', profileData),

  verifyToken: () => 
    api.get('/auth/verify'),

  getMathSectionQuestions: (sectionId: number) => 
    api.get(`/math/sections/${sectionId}/questions`),

  getAllMathSections: () => 
    api.get('/math/sections'),
};
