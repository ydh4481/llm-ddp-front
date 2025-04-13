'use client';

import { LeftSidebar } from '@/modules/layout/components/LeftSidebar';
import { useState } from 'react';
import { Header } from './Header';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLeftSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex flex-row bg-gray-200">
        <LeftSidebar isOpen={isLeftSidebarOpen} />
        <div className="flex flex-col w-full h-screen p-[2rem]">
          <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
          <main className="bg-gray-50 h-screen">
            <div className="max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};
