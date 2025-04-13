// src/lib/api/types.ts
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiOptions extends RequestInit {
  method?: Method;
  params?: Record<string, string | number | boolean>;
  data?: Record<string, string | number | boolean | null>;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  code: number;
  timestamp: string;
  data: T;
}
