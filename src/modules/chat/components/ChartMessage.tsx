'use client';

import { ChartBar } from '@/modules/chat/components/ChartBar';
import { ChartLine } from '@/modules/chat/components/ChartLine';
import { ChartPie } from '@/modules/chat/components/ChartPie';
import { ChartScatter } from '@/modules/chat/components/ChartScatter';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChatChart } from '../types';

interface ChartMessageProps {
  chart: ChatChart;
  data: {
    columns: string[];
    rows: Record<string, string | number | boolean>[];
  };
}
export const ChartMessage = ({ chart, data }: ChartMessageProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    update(); // 초기 값
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!chart || !chart.type || !data || data.rows.length === 0) {
    return (
      <Typography color="text.secondary" variant="body2">
        차트를 렌더링할 수 없습니다.
      </Typography>
    );
  }

  const { width, height } = size;
  const chartHeight = Math.min(height * 0.6, 500); // 최대 500px 제한
  const chartWidth = Math.min(width * 0.9, 800);
  const props = {
    xKey: chart.x_axis || '',
    yKey: chart.y_axis || '',
    rows: data.rows,
    height: chartHeight,
    width: chartWidth,
  };

  switch (chart.type) {
    case 'bar':
      return <ChartBar {...props} />;
    case 'line':
      return <ChartLine {...props} />;
    case 'pie':
      return <ChartPie height={chartHeight} rows={data.rows} width={chartWidth} />;
    case 'scatter':
      return <ChartScatter {...props} />;
    default:
      return (
        <Typography color="text.secondary" variant="body2">
          지원하지 않는 그래프 유형입니다.
        </Typography>
      );
  }
};
