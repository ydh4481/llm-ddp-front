'use client';

import { ScatterChart } from '@mui/x-charts/ScatterChart';

interface ChartScatterProps {
  xKey: string;
  yKey: string;
  rows: Record<string, string | number | boolean>[];
  width: number;
  height: number;
}

export const ChartScatter = ({ xKey, yKey, rows, height, width }: ChartScatterProps) => {
  return (
    <ScatterChart
      height={height}
      series={[
        {
          data: rows.map((r) => ({
            x: Number(r[xKey]),
            y: Number(r[yKey]),
          })),
        },
      ]}
      width={width}
    />
  );
};
