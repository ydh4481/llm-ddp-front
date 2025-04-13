'use client';

import { LeftSidebarHeader } from './LeftSidebarHeader';
import { LeftSidebarMenu } from './LeftSidebarMenu';

interface LeftSidebarProps {
  isOpen: boolean;
}

export const LeftSidebar = ({ isOpen }: LeftSidebarProps) => {
  return (
    <div
      className={`top-0 left-0 h-screen bg-white shadow-2xl overflow-hidden
        transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}
    >
      <div className="flex flex-col h-full">
        <div>
          <LeftSidebarHeader />
        </div>
        <div>
          <LeftSidebarMenu />
        </div>
      </div>
    </div>
  );
};
