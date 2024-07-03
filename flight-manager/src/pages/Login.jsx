// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import AuthService from '../services/AuthService';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box p={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <ErrorAlert message={error} />}
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
        <Box>
          <Typography variant="body1">
            Don't have an account?{" "}
            <Button onClick={handleNavigateToRegister} color="primary">
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
