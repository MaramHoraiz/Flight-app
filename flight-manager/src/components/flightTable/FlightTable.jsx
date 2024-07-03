import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import ImageCell from "./ImageCell";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const FlightTable = ({ flights, onDelete, onEdit }) => (
  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Capacity</TableCell>
          <TableCell>Departure Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flights.map((flight) => (
          <TableRow key={flight.code}>
            <ImageCell imgUrl={flight?.img} />
            <TableCell>{flight.code}</TableCell>
            <TableCell>{flight.capacity}</TableCell>
            <TableCell>{flight.departureDate}</TableCell>
            <TableCell>
              <EditButton
                flight={flight}
                onEdit={onEdit}
              />
              <DeleteButton flightId={flight.id} onDelete={onDelete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FlightTable;
