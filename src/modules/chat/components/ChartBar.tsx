'use client';

import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface ChartBarProps {
  xKey: string;
  yKey: string[]; // 여러 y축 키
  rows: Record<string, string | number | boolean>[];
  width: number;
  height: number;
}

export const ChartBar = ({ xKey, yKey, rows, height, width }: ChartBarProps) => {
  if (!rows.length) return <Typography>데이터가 없습니다.</Typography>;

  const xAxisData = rows.map((row) => row[xKey] as string);

  const series = yKey.map((key) => ({
    label: key,
    data: rows.map((row) => Number(row[key])),
  }));

  return (
    <BarChart
      height={height}
      margin={{ top: 30, bottom: 50, left: 70, right: 30 }}
      series={series}
      width={width}
      xAxis={[
        {
          id: 'x-axis',
          data: xAxisData,
          scaleType: 'band',
          label: xKey,
        },
      ]}
    />
  );
};
