import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Destructure isAuthenticated from your state
  const { isAuthenticated } = useSelector((state) => state.auth); // Make sure 'auth' exists in your Redux store

  // If user is not authenticated, redirect to login
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the children components or Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
