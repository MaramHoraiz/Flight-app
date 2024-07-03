import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({ flight, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(flight.code);
  const [capacity, setCapacity] = useState(flight.capacity);
  const [departureDate, setDepartureDate] = useState(flight.departureDate);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);  // Clear any previous error when dialog is closed
  };

  const handleEdit = async () => {
    // Check if there are any changes
    if (
      code === flight.code &&
      capacity === flight.capacity &&
      departureDate === flight.departureDate
    ) {
      setError('No changes detected.');
      return;
    }

    // Validate inputs
    if (code.trim() === '' || capacity <= 0) {
      setError('Please enter valid flight details.');
      return;
    }
    try{
        await onEdit(flight.id, { code, capacity, departureDate })
        handleClose();
    }catch(err){
        setError('Failed to update flight. Please make sure the code is unique.');
    }
    // try {
    //   await FlightService.updateFlight(flight.id, { code, capacity, departureDate });
    //   onEdit();
    //   handleClose();
    // } catch (err) {
    //   setError('Failed to update flight. Please make sure the code is unique.');
    // }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="edit">
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Flight</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this flight, please update the details below and click save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Code"
            type="text"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Departure Date"
            type="date"
            fullWidth
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditButton;
