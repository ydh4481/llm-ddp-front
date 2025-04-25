'use client';

import { createDatabase } from '@/lib/api/database';
import { createMeta } from '@/lib/api/meta';
import { useGlobalUI } from '@/modules/global/hooks/useGlobalUI';
import { Column, MetaInfo } from '@/modules/table/types';
import { useDatabaseStep } from '@/store/useDatabaseStep';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TableAccordion } from './TableAccordion';

export const DatabaseStep3 = () => {
  const { database, step, setStep, metaInfo, setMetaInfo } = useDatabaseStep();
  const { showToast } = useGlobalUI();
  const router = useRouter();

  const handleColumnEdit = (schema: string, table: string, columns: Column[]) => {
    setMetaInfo((prev) =>
      prev.map((t) => (t.schema_name === schema && t.table_name === table ? { ...t, columns } : t)),
    );
  };

  const handleDelete = (schema: string, table: string) => {
    setMetaInfo((prev: MetaInfo[]) =>
      prev.filter((t) => !(t.schema_name === schema && t.table_name === table)),
    );
  };

  const handleSubmit = async () => {
    try {
      const res = await createDatabase(database);
      const dbId = res.data.id;
      console.log('DB 생성 결과:', res, dbId);
      if (!dbId) {
        showToast('DB 생성 실패', 'error');
        return;
      }

      await createMeta(dbId, metaInfo);

      showToast('컬럼 메타 정보가 저장되었습니다.', 'success');
      router.push(`/db/${dbId}/`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : '저장 실패', 'error');
    }
  };

  const handleDescriptionEdit = (schema: string, table: string, description: string) => {
    setMetaInfo((prev) =>
      prev.map((t) =>
        t.schema_name === schema && t.table_name === table
          ? { ...t, table_description: description }
          : t,
      ),
    );
  };
  return (
    <Box>
      <Typography variant="h6">Step 3: 메타 정보 등록</Typography>
      <Typography color="text.secondary" variant="body2">
        테이블의 메타 정보를 등록해주세요. 등록된 메타 정보는 데이터베이스에 저장됩니다.
      </Typography>

      <Box className="flex flex-col gap-4 mt-6">
        {metaInfo.length === 0 ? (
          <Typography color="text.secondary">선택된 테이블이 없습니다.</Typography>
        ) : (
          metaInfo.map((table) => (
            <TableAccordion
              key={`${table.schema_name}.${table.table_name}`}
              onColumnEdit={handleColumnEdit}
              onDelete={handleDelete}
              onDescriptionEdit={handleDescriptionEdit}
              table={table}
            />
          ))
        )}
      </Box>

      <Box className="flex justify-between mt-8">
        <Button onClick={() => setStep(step - 1)}>← 이전</Button>
        <Button disabled={metaInfo.length === 0} onClick={handleSubmit} variant="contained">
          저장하고 완료 →
        </Button>
      </Box>
    </Box>
  );
};
