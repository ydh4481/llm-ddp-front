'use client';

import { DensityMediumOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <div className="mb-[2rem] flex items-center justify-between">
      <IconButton aria-label="toggle-sidebar" onClick={onToggleSidebar} size={'small'}>
        <DensityMediumOutlined />
      </IconButton>{' '}
    </div>
  );
};
