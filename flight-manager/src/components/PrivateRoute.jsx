// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = AuthService.isLoggedIn();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
