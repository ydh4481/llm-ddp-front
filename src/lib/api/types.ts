// src/lib/api/types.ts
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiOptions extends Omit<RequestInit, 'body'> {
  method?: Method;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  code: number;
  timestamp: string;
  data: T;
}
