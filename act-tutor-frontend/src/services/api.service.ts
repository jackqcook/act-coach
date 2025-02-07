import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Auth endpoints
  signup: (data: { email: string; password: string }) => 
    api.post('/auth/signup', data),
  
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  logout: () => api.post('/auth/logout'),

  // User profile endpoints
  getProfile: (userId: string) => 
    api.get(`/users/profile?user_id=${userId}`),
  
  createProfile: (profileData: any) => 
    api.post('/users/profile', profileData),

  verifyToken: () => 
    api.get('/auth/verify'),
}; 