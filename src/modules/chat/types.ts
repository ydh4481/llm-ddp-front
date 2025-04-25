export type ChatRole = 'user' | 'assistant';

export interface ChatChart {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  x_axis?: string | string[];
  y_axis?: string | string[];
}

export interface ChatData {
  columns: string[];
  rows: Record<string, string | number | boolean>[];
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
  sql?: string;
  chart?: ChatChart;
  data?: ChatData;
}
