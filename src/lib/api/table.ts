import { Table } from '@/modules/table/types';
import { fetcher } from './api';

/**
 * 테이블 목록 조회
 * GET /ddp/db/
 *
 * 테이블 생성
 * POST /ddp/db/table/
 */
export const fetchTables = () => {
  return fetcher<Table[]>('/ddp/db/table/');
};

// 등록
export const createTable = (data: Partial<Table>) =>
  fetcher<Table>('/ddp/db/table/', {
    method: 'POST',
    body: data,
  });
