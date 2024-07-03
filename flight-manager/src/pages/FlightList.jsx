import React from "react";
import {  Box, Button, useMediaQuery, Grid, Container } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FlightTable from "../components/flightTable/FlightTable";
import PaginationControls from "../components/flightTable/PaginationControls";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";
import CustomCard from "../components/CustomCard";
import ImageCell from "../components/flightTable/ImageCell";
import useFlights from "../utils/useFlights";

const FlightList = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const {
    flights,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    handleDeleteFlight,
    handleEditFlight,
  } = useFlights();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const initialSearch = searchParams.get("search") || "";

  const handleAddFlight = () => {
    navigate("/add-flight");
  };

  return (
    <Container
    maxWidth="md"
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {/* <Container> */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddFlight}
        style={{width:"20%"}}
      >
        Add Flight
      </Button>
      <Box mt={2} mb={2}>
      </Box>
      {isSmallScreen ? (
        <Grid container spacing={2}>
          {flights.map((flight) => (
            <Grid item xs={12} key={flight.id}>
              <CustomCard
                title={`Flight Code: ${flight.code}`}
                content={
                  <>
                    <div>Capacity: {flight.capacity}</div>
                    <div>Departure Date: {flight.departureDate}</div>
                    <ImageCell imgUrl={flight.img} />
                  </>
                }
              />
            </Grid>
          ))}
        </Grid>
      ) : loading ? (
        <Box mt={2} display="flex" justifyContent="center" height={"85%"} minHeight={600}>
        <LoadingIndicator />
        </Box>
      ) : error ? (
        <ErrorAlert message={error.message} />
      ) : (
        <>
          <FlightTable flights={flights} onDelete={handleDeleteFlight} onEdit={handleEditFlight} />
          <Box mt={2} display="flex" justifyContent="center">
            <PaginationControls
              totalPages={totalPages}
              page={page}
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
      </Container>
    // </Paper>
  );
};

export default FlightList;
