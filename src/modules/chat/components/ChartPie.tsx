'use client';

import { PieChart } from '@mui/x-charts/PieChart';

interface ChartPieProps {
  rows: Record<string, string | number | boolean>[];
  height: number;
  width: number;
}

export const ChartPie = ({ rows, height, width }: ChartPieProps) => {
  const data = rows.map((row, idx) => ({
    id: idx,
    value: Number(Object.values(row)[1]),
    label: String(Object.values(row)[0]),
  }));

  return <PieChart height={height} series={[{ data }]} width={width} />;
};
