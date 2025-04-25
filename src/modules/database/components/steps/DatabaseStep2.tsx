'use client';

import { extractMeta } from '@/lib/api/database';
import { useGlobalUI } from '@/modules/global/hooks/useGlobalUI';
import { Schema } from '@/modules/table/types';
import { useDatabaseStep } from '@/store/useDatabaseStep';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';

export const DatabaseStep2 = () => {
  const { database, schemaList, step, setStep, setMetaInfo } = useDatabaseStep();
  const { showToast } = useGlobalUI();

  const [loading, setLoading] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [selectedRows, setSelectedRows] = useState<Schema[]>([]);

  const handleNext = async () => {
    if (selectedRows.length === 0) {
      showToast('테이블을 선택해주세요', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await extractMeta(
        database.connection_info,
        selectedRows.map((row) => row.schema_name),
      );
      setMetaInfo(res.data);
      setStep(step + 1);
      showToast('메타 정보 추출을 완료했습니다.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : ' 추출 실패', 'error');
    } finally {
      setLoading(false);
    }
  };
  const schemaColumns: GridColDef[] = [{ field: 'schema_name', headerName: '스키마명', flex: 1 }];

  return (
    <Box>
      <Typography gutterBottom variant="h6">
        Step 2: 스키마 선택
      </Typography>
      <Typography color="text.secondary" variant="body2">
        스키마를 선택해주세요. 선택한 스키마의 메타 정보를 추출합니다.
      </Typography>

      {schemaList.length > 0 && (
        <Box className="w-full h-full mt-6">
          <DataGrid
            checkboxSelection
            columns={schemaColumns}
            disableRowSelectionOnClick
            getRowId={(row) => row.schema_name}
            loading={loading}
            onRowSelectionModelChange={(ids) => {
              setRowSelectionModel(ids);
              const selected = schemaList.filter((row) => ids.includes(row.schema_name));
              setSelectedRows(selected);
            }}
            rowSelectionModel={rowSelectionModel}
            rows={schemaList}
            sx={{ backgroundColor: '#fff', border: 0 }}
          />
        </Box>
      )}

      <Box className="flex justify-between mt-6">
        <Button onClick={() => setStep(step - 1)} variant="text">
          ← 이전
        </Button>
        <Button disabled={selectedRows.length === 0} onClick={handleNext} variant="contained">
          다음 단계로 →
        </Button>
      </Box>
    </Box>
  );
};
