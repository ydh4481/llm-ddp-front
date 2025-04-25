'use client';

import { useDatabases } from '@/modules/database/hooks/useDatabases';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: databases, loading } = useDatabases();
  const router = useRouter();

  const columns = [
    { field: 'id', headerName: 'ID', width: 5 },
    { field: 'name', headerName: '데이터베이스명', flex: 1 },
    { field: 'description', headerName: '설명', flex: 1 },
    { field: 'connection_info', headerName: '접속정보', flex: 1 },
    { field: 'created_at', headerName: '생성일', flex: 1 },
    { field: 'updated_at', headerName: '수정일', flex: 1 },
  ];

  return (
    <div className="w-auto h-full p-3">
      <div className="flex flex-row-reverse mb-5">
        <Button onClick={() => router.push('/db/create')} variant={'contained'}>
          데이터베이스 등록
        </Button>
      </div>
      <DataGrid
        autoPageSize={true}
        columns={columns}
        loading={loading}
        onRowClick={(params) => {
          router.push(`/db/${params.row.id}`);
        }}
        pageSizeOptions={[5, 10]}
        rows={databases}
        sx={{ border: 0 }}
      />
    </div>
  );
}
