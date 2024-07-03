import { useState } from 'react';
import FlightService from '../services/FlightService';

const useFlightFormValidation = (formData) => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = async () => {
        const errors = {};

        // Validate code
        if (!formData.code) {
            errors.code = 'Flight code is required';
        } else if (!/^[a-zA-Z]{6}$/.test(formData.code)) {
            errors.code = 'Flight code must be 6 characters long and only contain letters';
        }

        // Validate capacity
        const capacity = parseInt(formData.capacity, 10);
        if (!formData.capacity) {
            errors.capacity = 'Capacity is required';
        } else if (!Number.isInteger(capacity) || capacity < 1 || capacity > 200) {
            errors.capacity = 'Capacity must be a number between 1 and 200';
        }

        // Validate departureDate
        if (!formData.departureDate) {
            errors.departureDate = 'Departure date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return {
        formErrors,
        validateForm,
    };
};

export default useFlightFormValidation;
