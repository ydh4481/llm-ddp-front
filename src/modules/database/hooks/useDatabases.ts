// src/hooks/useDatabases.ts

import { fetchDatabases } from '@/lib/api/database';
import { Database } from '@/modules/database/types';
import { useEffect, useState } from 'react';

export const useDatabases = () => {
  const [data, setData] = useState<Database[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchDatabases();
        setData(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading, error };
};
