// src/components/CustomCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  border: '1px solid #ddd',
}));

const CustomCard = ({ title, content }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <div>{content}</div>
      </CardContent>
    </StyledCard>
  );
};

export default CustomCard;
