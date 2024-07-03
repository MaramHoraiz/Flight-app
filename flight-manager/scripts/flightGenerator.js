const axios = require('axios');
const { faker } = require('@faker-js/faker');

// Configuration
const API_URL = 'http://localhost:3000/flights';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlZjkzZTUzLTJmYjktNDczOS04MThhLWUwYTk3NGJkYzFlNCIsIm5hbWUiOiJqb2huIiwiZW1haWwiOiJqb2huQGRvZS5jb20iLCJpYXQiOjE3MTk2NTI0NjAsImV4cCI6MTcxOTY1MzY2MH0.WZUon9UAwYM-QVxd4-5De3tAzC5Ghd_A3g386aOPkE4';

// Set to store generated codes to ensure uniqueness
const generatedCodes = new Set();

// Function to randomize case of each character in a string
const randomizeCase = (str) => {
  return str.split('').map(char => Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');
};

const createRandomFlight = () => {
  let code;
  // Ensure unique flight code
  do {
    code = randomizeCase('AbcDef');
  } while (generatedCodes.has(code));
  
  generatedCodes.add(code);

  const capacity = faker.number.int({ min: 1, max: 200 });
  const departureDate = faker.date.past().toISOString().split('T')[0]; // Format date to YYYY-MM-DD

  return {
    code,
    capacity,
    departureDate,
  };
};

const createFlight = async (flightData) => {
  try {
    const response = await axios.post(API_URL, flightData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
      },
    });
    console.log('Flight created:', response.data);
  } catch (error) {
    console.error('Error creating flight:', error.response ? error.response.data : error.message);
  }
};

const generateFlights = async (count) => {
  for (let i = 0; i < count; i++) {
    const flightData = createRandomFlight();
    await createFlight(flightData);
  }
};

// Generate and create 10 random flights
generateFlights(10);
