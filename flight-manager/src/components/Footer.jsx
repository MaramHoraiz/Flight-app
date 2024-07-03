import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" py={3} textAlign="center" bgcolor="primary.main" color="white" mt={4}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Flight Manager. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
