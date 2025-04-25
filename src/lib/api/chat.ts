import { fetcher } from './api';

// SQL 생성 응답 타입
export interface GenerateSQLResponse {
  id: string;
  query: string;
  result: 'SUCCESS' | 'ERROR';
  message: string;
  follow_up_question?: string;
}

// SQL 실행 응답 타입
export interface ExecuteSQLResponse {
  columns: string[];
  // eslint-disable-next-line
  rows: Record<string, any>[];
  row_count: number;
  elapsed_ms: number;
  summary: string;
  // eslint-disable-next-line
  chart: Record<string, any>[];
}

/**
 * 자연어 → SQL 생성 요청
 * @param dbId 데이터베이스 ID
 * @param question 사용자 질문
 */
export const generateSQL = (dbId: number, question: string) => {
  return fetcher<GenerateSQLResponse>(`/llm/generate-sql/db/${dbId}/`, {
    method: 'POST',
    body: { question },
  });
};

/**
 * SQL 실행 요청
 * @param dbId 데이터베이스 ID
 * @param sessionId 생성된 SQL ID
 */
export const executeSQL = (dbId: number, sessionId: string) => {
  return fetcher<ExecuteSQLResponse>(`/llm/execute-sql/db/${dbId}/${sessionId}`, {
    method: 'POST',
    params: { summarize: true },
  });
};
