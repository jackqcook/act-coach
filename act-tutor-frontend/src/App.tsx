import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import TestPage from './pages/TestPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import ReadingPage from './pages/ReadingPage';
import EnglishPage from './pages/EnglishPage';
import MathPage from './pages/MathPage';
import SciencePage from './pages/SciencePage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute'
import MathSectionsPage from './pages/MathSectionsPage';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

// Protected Route wrapper component
const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/test" element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              } />           
              <Route path="/reading" element={
                <ProtectedRoute>
                  <ReadingPage />
                </ProtectedRoute>
              } />
              <Route path="/english" element={
                <ProtectedRoute>
                  <EnglishPage />
                </ProtectedRoute>
              } />
              <Route path="/math" element={
                <ProtectedRoute>
                  <MathPage />
                </ProtectedRoute>
              } />
              <Route path="/science" element={
                <ProtectedRoute>
                  <SciencePage />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/complete-profile" element={
                <ProtectedRoute>
                  <CompleteProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/math-sections" element={
                <ProtectedRoute>
                  <MathSectionsPage />
                </ProtectedRoute>
              } />
              <Route path="/math/:sectionId" element={
                <ProtectedRoute>
                  <MathPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
