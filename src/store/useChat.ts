// src/store/useChat.ts

import { executeSQL, generateSQL } from '@/lib/api/chat';
import { ChatChart, ChatMessage } from '@/modules/chat/types';
import { create } from 'zustand';

interface ChatStore {
  messages: ChatMessage[];
  input: string;
  databaseId: number | null;
  setDatabaseId: (id: number) => void;
  setInput: (val: string) => void;
  sendMessage: (msg: string) => Promise<void>;
  reset: () => void;
}

export const useChat = create<ChatStore>((set, get) => ({
  messages: [],
  input: '',
  databaseId: null,

  setDatabaseId: (id) => set({ databaseId: id }),
  setInput: (val) => set({ input: val }),

  sendMessage: async (msg: string) => {
    const dbId = get().databaseId;

    if (!dbId) {
      set((state) => ({
        messages: [
          ...state.messages,
          { role: 'user', content: msg },
          { role: 'assistant', content: '❌ 데이터베이스가 선택되지 않았습니다.' },
        ],
        input: '',
      }));
      return;
    }

    set((state) => ({
      messages: [
        ...state.messages,
        { role: 'user', content: msg },
        { role: 'assistant', content: 'loading' },
      ],
      input: '',
    }));

    try {
      const { data: generateResult } = await generateSQL(dbId, msg);

      if (generateResult.result === 'ERROR') {
        set((state) => ({
          messages: [
            ...state.messages,
            { role: 'assistant', content: `⚠️ SQL 생성 실패: ${generateResult.message}` },
          ],
        }));
        return;
      }

      const sql = generateResult.query;
      const sessionId = generateResult.id;

      const { data: executeResult } = await executeSQL(dbId, sessionId);
      const chart = Array.isArray(executeResult.chart)
        ? executeResult.chart[0]
        : executeResult.chart;
      console.log('executeResult', executeResult);
      set((state) => ({
        messages: [
          ...state.messages.filter((m) => m.content !== 'loading'),
          {
            role: 'assistant',
            content: executeResult.summary, // summary → content
            sql,
            chart: chart as ChatChart,
            data: {
              columns: executeResult.columns,
              rows: executeResult.rows,
            },
          },
        ],
      }));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : '❗ 예기치 못한 오류가 발생했습니다.';
      set((state) => ({
        messages: [...state.messages, { role: 'assistant', content: errorMsg }],
      }));
    }
  },

  reset: () => set({ messages: [], input: '', databaseId: null }),
}));
