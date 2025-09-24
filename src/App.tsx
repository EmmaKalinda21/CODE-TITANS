import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import FarmManagement from './pages/FarmManagement';
import WeatherForecast from './pages/WeatherForecast';
import AnimalHealth from './pages/AnimalHealth';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/layout/Layout';
// Protected route component
const ProtectedRoute = ({
  children
}) => {
  const {
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
// Admin route component
const AdminRoute = ({
  children
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};
export function App() {
  return <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/disease-detection" element={<ProtectedRoute>
                <Layout>
                  <DiseaseDetection />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/farm-management" element={<ProtectedRoute>
                <Layout>
                  <FarmManagement />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute>
                <Layout>
                  <WeatherForecast />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/animal-health" element={<ProtectedRoute>
                <Layout>
                  <AnimalHealth />
                </Layout>
              </ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute>
                <Layout>
                  <AdminPanel />
                </Layout>
              </AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>;
}