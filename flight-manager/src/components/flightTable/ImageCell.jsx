// src/components/ImageCell.js
import React, { useState } from 'react';
import { TableCell, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FlightIcon from '@mui/icons-material/Flight';
const ImageCell = ({ imgUrl }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableCell>
      {imgUrl ? (
        <>
          <IconButton onClick={handleClickOpen}>
            <ImageIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
              <img src={imgUrl} alt="Flight Image" style={{ width: '100%' }} />
            </DialogContent>
          </Dialog>
        </>
      ) : (
       <FlightIcon/> 
      )}
    </TableCell>
  );
};

export default ImageCell;
