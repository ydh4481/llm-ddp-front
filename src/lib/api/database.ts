import { Database } from '@/modules/database/types';
import { fetcher } from './api';

/**
 * 데이터베이스 목록 조회
 * GET /ddp/db/
 */
export const fetchDatabases = () => {
  return fetcher<Database[]>('/ddp/db/');
};

// 등록
export const createDatabase = (data: Partial<Database>) =>
  fetcher<Database>('/ddp/db/', {
    method: 'POST',
    data: data,
  });

// 수정
export const updateDatabase = (id: number, data: Partial<Database>) =>
  fetcher<Database>(`/ddp/db/${id}/`, {
    method: 'PUT',
    data: data,
  });

// 삭제
export const deleteDatabase = (id: number) =>
  fetcher<void>(`/ddp/db/${id}/`, {
    method: 'DELETE',
  });
