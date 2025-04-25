'use client';

import { LeftSidebar } from '@/modules/layout/components/LeftSidebar';
import { useSidebar } from '@/store/useSidebar';
import { Header } from './Header';
import { RightSidebar } from './RightSideBar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { leftSidebarOpen, setLeftSidebarOpen } = useSidebar();
  return (
    <>
      <div className="flex flex-row w-screen h-screen bg-whit">
        <LeftSidebar isOpen={leftSidebarOpen} />
        <div className="flex flex-col flex-1 min-w-0 p-[1rem]">
          <Header onToggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)} />
          <main className="flex-1 h-screen overflow-auto bg-gray-50">{children}</main>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};
