// src/modules/global/components/GlobalToast.tsx

'use client';

import { Alert, Snackbar } from '@mui/material';

interface GlobalToastProps {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
}

export const GlobalToast = ({ open, message, severity, onClose }: GlobalToastProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={onClose}
      open={open}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
