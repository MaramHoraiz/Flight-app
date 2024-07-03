// src/pages/FlightList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlightList from './FlightList';
import { getFlights } from '../services/FlightService';

// Mock the getFlights service
jest.mock('../services/flightService');

const mockFlights = [
  {
    id: 1,
    code: 'ABC123',
    capacity: 100,
    departureDate: '2024-06-30',
    img: 'https://example.com/image1.jpg',
  },
  {
    id: 2,
    code: 'XYZ789',
    capacity: 150,
    departureDate: '2024-07-01',
    img: null,
  },
];

test('renders flight list with mocked data', async () => {
  getFlights.mockResolvedValueOnce(mockFlights);

  render(<FlightList />);

  const flightCode = await screen.findByText(/ABC123/i);
  expect(flightCode).toBeInTheDocument();
});
