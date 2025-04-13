'use client';

import { useDatabases } from '@/modules/database/hooks/useDatabases';
import { DataGrid } from '@mui/x-data-grid';

export default function Page() {
  const { data: databases, loading, error } = useDatabases();

  // if (loading) return <p>불러오는 중...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  console.log(databases);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'description', headerName: '설명', width: 250 },
    { field: 'createdAt', headerName: '생성일', width: 180 },
    { field: 'updatedAt', headerName: '수정일', width: 180 },
  ];

  return (
    <div>
      <DataGrid
        checkboxSelection
        columns={columns}
        pageSizeOptions={[5, 10]}
        rows={databases}
        sx={{ border: 0 }}
      />
    </div>
  );
}
