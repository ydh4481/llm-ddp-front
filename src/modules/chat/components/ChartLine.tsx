'use client';

import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

interface ChartLineProps {
  rows: Record<string, string | number | boolean>[];
  xKey: string;
  yKey: string[]; // 여러 y축 필드
  width: number;
  height: number;
}

export const ChartLine = ({ rows, xKey, yKey, width, height }: ChartLineProps) => {
  if (!rows.length) return <Typography>데이터가 없습니다.</Typography>;

  const xData = rows.map((row) => row[xKey]);

  const series = yKey.map((key) => ({
    label: key,
    data: rows.map((row) => Number(row[key])),
  }));

  return (
    <LineChart
      height={height}
      series={series}
      width={width}
      xAxis={[{ data: xData, scaleType: 'point' }]}
    />
  );
};
