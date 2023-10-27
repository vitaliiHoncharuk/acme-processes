import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import { useNotification } from './NotificationContext';

const Notification: React.FC = () => {
  const { notification } = useNotification();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const handleSnackbarClose = (
    event: SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleAlertClose = () => {
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    setIsSnackbarOpen(notification !== null);
  }, [notification]);

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <div>
        {notification && (
          <Alert
            data-testid="notification-alert"
            onClose={handleAlertClose}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        )}
      </div>
    </Snackbar>
  );
};

export default Notification;
