// src/store/useDatabase.ts

import { Database, MetaInfo } from '@/modules/table/types';
import { create } from 'zustand';

interface UseDatabaseState {
  database: Database | null;
  metaInfo: MetaInfo[];
  setDatabase: (db: Database | null) => void;
  setMetaInfo: (meta: MetaInfo[]) => void;
  updateMetaInfo: (meta: MetaInfo[] | ((prev: MetaInfo[]) => MetaInfo[])) => void;
  reset: () => void;
}

export const useDatabase = create<UseDatabaseState>((set) => ({
  database: null,
  metaInfo: [],
  setDatabase: (db) => set({ database: db }),
  setMetaInfo: (meta) => set({ metaInfo: meta }),
  updateMetaInfo: (meta) =>
    set((state) => ({
      metaInfo: typeof meta === 'function' ? meta(state.metaInfo) : meta,
    })),
  reset: () =>
    set({
      database: null,
      metaInfo: [],
    }),
}));
