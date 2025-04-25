'use client';

import { extractSchema, testDatabaseConnection } from '@/lib/api/database';
import { isValidJson } from '@/lib/utils/validate';
import { useGlobalUI } from '@/modules/global/hooks/useGlobalUI';
import { useDatabaseStep } from '@/store/useDatabaseStep';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const dbTypes = [
  { label: 'MySQL', value: 'mysql' },
  { label: 'PostgreSQL', value: 'postgres' },
  { label: 'Oracle', value: 'oracle' },
  { label: 'MSSQL', value: 'mssql' },
];

const dbDefaultConnectionInfo: Record<string, Record<string, string>> = {
  mysql: {
    host: 'test-db',
    db: 'test_ecommerce',
    user: 'root',
    passwd: 'admin',
  },
  postgres: {
    host: 'localhost',
    db: 'test_postgres',
    user: 'postgres',
    passwd: 'admin',
  },
  oracle: {
    host: 'localhost',
    db: 'XE',
    user: 'system',
    passwd: 'oracle',
  },
  mssql: {
    host: 'localhost',
    db: 'test_mssql',
    user: 'sa',
    passwd: 'admin123',
  },
};

export const DatabaseStep1 = () => {
  const { database, updateDatabase, setStep, setSchemaList } = useDatabaseStep();

  const { showToast } = useGlobalUI();

  const [isJsonValid, setIsJsonValid] = useState(true);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    updateDatabase({
      db_type: selected,
      connection_info: JSON.stringify(dbDefaultConnectionInfo[selected], null, 2),
    });

    setConnected(false);
  };

  const testConnection = async () => {
    try {
      await testDatabaseConnection(database.connection_info);
      setConnected(true);
      showToast('데이터베이스 연결이 완료됐습니다.', 'success');
    } catch (err: unknown) {
      setConnected(false);
      showToast(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.', 'error');
    }
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      const res = await extractSchema(database.connection_info);
      setSchemaList(res.data);
      showToast('데이터베이스 정보가 저장됐습니다.', 'success');
      setStep(1);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const canRegister =
    connected && database.name.trim() !== '' && database.description.trim() !== '';

  return (
    <Box>
      <Typography>Step 1: 접속 정보 입력</Typography>
      <Box className="flex flex-col gap-3 mt-5">
        <FormControl fullWidth size="small">
          <InputLabel>DB 종류</InputLabel>
          <Select label="DB 종류" onChange={handleTypeChange} value={database.db_type}>
            {dbTypes.map((db) => (
              <MenuItem key={db.value} value={db.value}>
                {db.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="데이터베이스 명"
          onChange={(e) => updateDatabase({ name: e.target.value })}
          size="small"
          value={database.name}
          variant="outlined"
        />

        <TextField
          fullWidth
          label="설명"
          onChange={(e) => updateDatabase({ description: e.target.value })}
          size="small"
          value={database.description}
          variant="outlined"
        />

        <TextField
          error={!isJsonValid}
          fullWidth
          helperText={!isJsonValid ? '올바른 JSON 형식이 아닙니다.' : ' '}
          label="접속 정보 (JSON)"
          minRows={6}
          multiline
          onChange={(e) => {
            const value = e.target.value;
            updateDatabase({ connection_info: value });
            setIsJsonValid(isValidJson(value));
          }}
          size="small"
          value={database.connection_info}
          variant="outlined"
        />

        <Button disabled={!isJsonValid} onClick={testConnection} variant="outlined">
          연결 테스트
        </Button>

        {connected && (
          <Typography className="mt-1 ml-1" color="success.main" variant="body2">
            테스트 연결 완료
          </Typography>
        )}

        <div className="flex flex-row-reverse">
          <Button disabled={!canRegister || loading} onClick={handleNext} variant="contained">
            다음 단계로 →
          </Button>
        </div>
      </Box>
    </Box>
  );
};
