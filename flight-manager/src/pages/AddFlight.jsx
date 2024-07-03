import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import FlightService from "../services/FlightService";
import useFlightFormValidation from "../utils/useFlightFormValidation";
import ImageUpload from "../components/ImageUpload";
import { useNavigate, useLocation } from 'react-router-dom';

const AddFlightPage = () => {
  const [formData, setFormData] = useState({
    code: "",
    capacity: 1,
    departureDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { formErrors, validateForm } = useFlightFormValidation(formData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (base64String) => {
    setFormData({ ...formData, photo: base64String });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (await validateForm()) {
      try {
        if (formData.photo) {
          await FlightService.addFlightWithPhoto({ ...formData });
        } else {
          const { code, capacity, departureDate } = formData;
          await FlightService.addFlight({ code, capacity, departureDate });
        }
        setSuccess(true);
        navigate('/');

      } catch (err) {
        console.error("Error adding flight:", err);
        setError("Failed to add flight");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Add Flight</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid
          style={{
            display: "flex",
            minHeight: "370px",
          }}
        >
          <Grid
            width={"50%"}
            
            style={{ display: "flex", flexDirection: "column", gap: "1rem",marginRight:"1rem" }}
          >
            <TextField
              name="code"
              label="Flight Code"
              value={formData.code}
              onChange={handleChange}
              error={!!formErrors.code}
              helperText={formErrors.code}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              name="capacity"
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              error={!!formErrors.capacity}
              helperText={formErrors.capacity}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              name="departureDate"
              label="Departure Date"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              error={!!formErrors.departureDate}
              helperText={formErrors.departureDate}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              disabled={loading}
            />
          </Grid>
          <ImageUpload onImageChange={handleImageChange} disabled={loading} />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Flight added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddFlightPage;
