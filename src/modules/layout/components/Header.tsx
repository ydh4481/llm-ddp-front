'use client';

import DehazeIcon from '@mui/icons-material/Dehaze';
import { IconButton } from '@mui/material';
interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <div className="mb-[1rem] flex items-center justify-between">
      <IconButton aria-label="toggle-sidebar" onClick={onToggleSidebar} size={'small'}>
        <DehazeIcon />
      </IconButton>{' '}
    </div>
  );
};
