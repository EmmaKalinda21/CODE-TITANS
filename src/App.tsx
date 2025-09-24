import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VoiceProvider } from './context/VoiceContext';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import WeatherForecast from './pages/WeatherForecast';
import FarmManagement from './pages/FarmManagement';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
export function App() {
  return <AuthProvider>
      <VoiceProvider>
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user-dashboard" element={<ProtectedRoute userType="user">
                    <UserDashboard />
                  </ProtectedRoute>} />
              <Route path="/admin-dashboard" element={<ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>} />
              <Route path="/disease-detection" element={<ProtectedRoute userType="any">
                    <DiseaseDetection />
                  </ProtectedRoute>} />
              <Route path="/weather" element={<ProtectedRoute userType="any">
                    <WeatherForecast />
                  </ProtectedRoute>} />
              <Route path="/farm-management" element={<ProtectedRoute userType="user">
                    <FarmManagement />
                  </ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute userType="any">
                    <Settings />
                  </ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
          <Toaster position="top-center" />
        </div>
      </VoiceProvider>
    </AuthProvider>;
}