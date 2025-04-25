import { Database, MetaInfo, Schema } from '@/modules/table/types';
import { create } from 'zustand';

const defaultDbType = 'mysql';
const defaultConnectionInfo = JSON.stringify(
  {
    host: 'test-db',
    db: 'test_ecommerce',
    user: 'root',
    passwd: 'admin',
  },
  null,
  2,
);

const defaultNames = {
  name: 'test-ecommerce',
  description: '이커머스 시스템의 테스트 데이터베이스 입니다.',
};

const defaultDatabase: Database = {
  id: undefined,
  db_type: defaultDbType,
  name: defaultNames.name,
  description: defaultNames.description,
  connection_info: defaultConnectionInfo,
};

interface useDatabaseStepState {
  database: Database;
  step: number;
  schemaList: Schema[];
  metaInfo: MetaInfo[];

  setDatabase: (db: Database) => void;
  updateDatabase: (partial: Partial<Database>) => void;
  setStep: (step: number) => void;
  setSchemaList: (list: Schema[]) => void;
  setMetaInfo: (data: MetaInfo[] | ((prev: MetaInfo[]) => MetaInfo[])) => void;
  reset: () => void;
}

export const useDatabaseStep = create<useDatabaseStepState>((set) => ({
  database: { ...defaultDatabase },
  step: 0,
  metaInfo: [],
  schemaList: [],

  setDatabase: (db) => set({ database: db }),
  updateDatabase: (partial) =>
    set((state) => ({
      database: {
        ...state.database,
        ...partial,
      },
    })),
  setStep: (step) => set({ step }),
  setSchemaList: (list) => set({ schemaList: list }),
  setMetaInfo: (data) =>
    set((prev) => ({
      metaInfo: typeof data === 'function' ? data(prev.metaInfo) : data,
    })),
  reset: () =>
    set({
      database: { ...defaultDatabase },
      step: 0,
      metaInfo: [],
      schemaList: [],
    }),
}));
