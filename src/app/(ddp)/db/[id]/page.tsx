'use client';

import { getDatabaseById } from '@/lib/api/database';
import { getMetaInfoByDbId } from '@/lib/api/meta';
import { TableAccordion } from '@/modules/database/components/steps/TableAccordion';
import { useChat } from '@/store/useChat';
import { useDatabase } from '@/store/useDatabase';
import { useSidebar } from '@/store/useSidebar';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DatabaseDetailPage() {
  const { id } = useParams();
  const dbId = Number(id);
  const { database, metaInfo, setDatabase, setMetaInfo } = useDatabase();
  const { setRightSidebarOpen } = useSidebar();
  const [loading, setLoading] = useState(true);
  const { setDatabaseId } = useChat();

  useEffect(() => {
    const load = async () => {
      try {
        const db = await getDatabaseById(dbId);
        const meta = await getMetaInfoByDbId(dbId);
        setDatabase(db.data);
        setMetaInfo(meta.data);
        setDatabaseId(dbId);
      } catch (e) {
        console.error('데이터 로딩 실패', e);
      } finally {
        setLoading(false);
      }
    };

    if (dbId) load();
    // eslint-disable-next-line
  }, [dbId]);

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-full">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="w-full h-full p-3">
      <Box className="flex justify-between">
        <Typography gutterBottom variant="h5">
          {database?.name}
        </Typography>
        <ChatIcon onClick={() => setRightSidebarOpen(true)} />
      </Box>
      <Typography color="text.secondary" gutterBottom variant="body2">
        {database?.description}
      </Typography>

      <Box className="flex flex-col gap-4 mt-4">
        {metaInfo.map((table) => (
          <TableAccordion key={`${table.schema_name}.${table.table_name}`} table={table} />
        ))}
      </Box>
    </Box>
  );
}
