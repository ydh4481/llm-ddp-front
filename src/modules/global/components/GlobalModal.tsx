// src/modules/global/components/GlobalModal.tsx

'use client';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface GlobalModalProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export const GlobalModal = ({ open, title, content, onClose }: GlobalModalProps) => {
  return (
    <Dialog fullWidth maxWidth="lg" onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Box>{content}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};
