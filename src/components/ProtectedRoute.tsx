import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'admin' | 'user' | 'any';
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userType
}) => {
  const {
    isAuthenticated,
    currentUser
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (userType === 'any') {
    return <>{children}</>;
  }
  if (userType === 'admin' && currentUser?.type !== 'admin') {
    return <Navigate to="/user-dashboard" replace />;
  }
  if (userType === 'user' && currentUser?.type !== 'user') {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;