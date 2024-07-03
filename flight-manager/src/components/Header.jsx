import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Switch } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import AuthService from '../services/AuthService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const handleLoginOrRegister = () => {
    navigate('/login');
  };

  const isLoggedIn = AuthService.isLoggedIn();
  const isLoginPage = location.pathname === '/login';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flight Manager
        </Typography>
        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginOrRegister}>
            {isLoginPage ? 'Register' : 'Login'}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
