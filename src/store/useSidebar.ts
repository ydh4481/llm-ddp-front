// store/useSidebar.ts
import { create } from 'zustand';

interface SidebarState {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  setLeftSidebarOpen: (value: boolean) => void;
  setRightSidebarOpen: (value: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: false,
  setLeftSidebarOpen: (value) => set({ leftSidebarOpen: value }),
  setRightSidebarOpen: (value) => set({ rightSidebarOpen: value }),
}));
