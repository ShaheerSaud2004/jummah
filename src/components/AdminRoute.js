import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthenticated } from '../utils/adminAuth';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = isAdminAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;

