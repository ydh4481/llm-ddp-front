import { MetaInfo } from '@/modules/table/types';
import { fetcher } from './api';

// 등록
export const createMeta = (dbId: number, data: MetaInfo[]) =>
  fetcher<MetaInfo>(`/ddp/db/${dbId}/meta/`, {
    method: 'POST',
    body: { metadata: data },
  });

export const getMetaInfoByDbId = (dbId: number) =>
  fetcher<MetaInfo[]>(`/ddp/db/${dbId}/meta/`, {
    method: 'GET',
  });
