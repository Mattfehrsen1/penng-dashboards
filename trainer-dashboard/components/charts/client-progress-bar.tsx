'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ClientProgressBarProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  valueFormatter?: (value: number) => string;
  tooltipLabel?: string;
}

export function ClientProgressBar({
  data,
  valueFormatter = (value) => value.toString(),
  tooltipLabel = 'Value'
}: ClientProgressBarProps) {
  const DEFAULT_COLORS = ['#2735cf', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="name"
          stroke="#a1a1aa"
          style={{ fontSize: '11px' }}
          angle={-15}
          textAnchor="end"
          height={80}
        />
        <YAxis
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(39, 53, 207, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(12px)',
          }}
          formatter={(value: number) => [valueFormatter(value), tooltipLabel]}
          labelStyle={{ color: '#f9f9f1' }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
