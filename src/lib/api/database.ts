import { Database } from '@/modules/database/types';
import { MetaInfo, Schema } from '@/modules/table/types';
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
    body: data,
  });

// 수정
export const updateDatabase = (id: number, data: Partial<Database>) =>
  fetcher<Database>(`/ddp/db/${id}/`, {
    method: 'PUT',
    body: data,
  });

// 삭제
export const deleteDatabase = (id: number) =>
  fetcher<void>(`/ddp/db/${id}/`, {
    method: 'DELETE',
  });

export const getDatabaseById = (id: number) =>
  fetcher<Database>(`/ddp/db/${id}/`, {
    method: 'GET',
  });

// 연결 테스트
export const testDatabaseConnection = (connectionInfo: string) =>
  fetcher('/ddp/db/connect/', {
    method: 'POST',
    body: {
      connection_info: connectionInfo,
    },
  });

// 스키마 정보 추출
export const extractSchema = (connectionInfo: string) =>
  fetcher<Schema[]>('/ddp/extract/schema/', {
    method: 'POST',
    body: { connection_info: connectionInfo },
  });

// 테이블 정보 추출
export const extractMeta = (connectionInfo: string, schemaList: string[] = []) =>
  fetcher<MetaInfo[]>('/ddp/extract/table/', {
    method: 'POST',
    body: { connection_info: connectionInfo, schema_list: schemaList },
  });
