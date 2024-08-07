// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  console.log(role)
  if (!email || role !== 'superadmin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
