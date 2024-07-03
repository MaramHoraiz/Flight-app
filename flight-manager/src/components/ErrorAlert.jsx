// src/components/ErrorAlert.js

import React from 'react';
import { Alert } from '@mui/material';

const ErrorAlert = ({ message }) => (
  <Alert severity="error">{message}</Alert>
);

export default ErrorAlert;
