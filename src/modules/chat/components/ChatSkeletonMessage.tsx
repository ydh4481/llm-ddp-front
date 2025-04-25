// src/modules/layout/components/ChatSkeletonMessage.tsx

'use client';

import { Box, Skeleton } from '@mui/material';

export const ChatSkeletonMessage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        p: 1.5,
        borderRadius: 2,
        maxWidth: '80%',
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '50%',
      }}
    >
      <Skeleton height={20} variant="text" width="60%" />
      <Skeleton height={20} variant="text" width="40%" />
    </Box>
  );
};
