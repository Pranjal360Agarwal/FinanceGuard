import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

interface LoadingPopupProps {
  open: boolean;
  onClose: () => void;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Loading</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Please wait a moment. The backend server is loading and might take up a few seconds.
        </Typography>
        <Button onClick={onClose} color="primary" variant="contained" style={{ marginTop: '1rem' }}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingPopup;
