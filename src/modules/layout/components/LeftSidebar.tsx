'use client';

import { LeftSidebarHeader } from './LeftSidebarHeader';
import { LeftSidebarMenu } from './LeftSidebarMenu';

interface LeftSidebarProps {
  isOpen: boolean;
}

export const LeftSidebar = ({ isOpen }: LeftSidebarProps) => {
  return (
    <div
      className={`bg-white shadow-2xl whitespace-nowrap
        transition-[width] duration-300 flex-shrink-0
        ${isOpen ? 'w-64' : 'w-0'}`}
    >
      <div className="flex flex-col h-full">
        <LeftSidebarHeader />
        <LeftSidebarMenu />
      </div>
    </div>
  );
};
