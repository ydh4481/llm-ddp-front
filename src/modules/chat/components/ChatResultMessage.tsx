'use client';

import { Box, Button, Collapse, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { GlobalModal } from '../../global/components/GlobalModal';
import { ChatChart } from '../types';
import { ChartMessage } from './ChartMessage';

interface ChatResultMessageProps {
  message: string;
  sql?: string;
  chart?: ChatChart;
  data?: {
    columns: string[];
    rows: Record<string, string | number | boolean>[];
  };
}

export const ChatResultMessage = ({ message, sql, chart, data }: ChatResultMessageProps) => {
  const [showSQL, setShowSQL] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const columns: GridColDef[] =
    data && data.rows.length > 0
      ? data.columns.map((key) => ({
          field: key,
          headerName: key,
          flex: 1,
        }))
      : [];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{message}</Typography>

      {/* SQL 영역 */}
      {sql && (
        <Box>
          <Button onClick={() => setShowSQL((prev) => !prev)} size="small" variant="outlined">
            {showSQL ? 'SQL 숨기기' : 'SQL 보기'}
          </Button>
          <Collapse in={showSQL}>
            <Box
              bgcolor="#f5f5f5"
              borderRadius={1}
              component="pre"
              fontFamily="monospace"
              mt={1}
              p={2}
              whiteSpace="pre-wrap"
            >
              <code>{sql}</code>
            </Box>
          </Collapse>
        </Box>
      )}

      {/* 데이터 영역 */}
      {data && (
        <Box>
          <Button onClick={() => setShowData((prev) => !prev)} size="small" variant="outlined">
            {showData ? '데이터 숨기기' : '데이터 보기'}
          </Button>
          <Collapse in={showData}>
            <Box height={300} mt={1}>
              <DataGrid
                columns={columns}
                pageSizeOptions={[5, 10]}
                rows={data.rows.map((row, i) => ({ id: i, ...row }))}
              />
            </Box>
          </Collapse>
        </Box>
      )}

      {/* 차트 영역 */}
      {chart && data && (
        <Box>
          <Button onClick={() => setShowChart((prev) => !prev)} size="small" variant="outlined">
            {showChart ? '그래프 숨기기' : '그래프 보기'}
          </Button>
          {/* 차트 모달 */}
          <GlobalModal
            content={
              <Box>
                <ChartMessage chart={chart} data={data} />
              </Box>
            }
            onClose={() => setShowChart(false)}
            open={showChart}
            title="그래프 시각화"
          />
        </Box>
      )}
    </Box>
  );
};
