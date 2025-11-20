'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CostSavingsBarProps {
  data: {
    reducedAbsenteeism: number;
    healthInsurance: number;
    productivityGains: number;
  };
}

const COLORS = {
  reducedAbsenteeism: '#10B981',
  healthInsurance: '#3B82F6',
  productivityGains: '#8B5CF6',
};

const LABELS = {
  reducedAbsenteeism: 'Reduced Absenteeism',
  healthInsurance: 'Health Insurance',
  productivityGains: 'Productivity Gains',
};

export function CostSavingsBar({ data }: CostSavingsBarProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: LABELS[key as keyof typeof LABELS],
    amount: value,
    color: COLORS[key as keyof typeof COLORS],
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
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
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(39, 53, 207, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(12px)',
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Savings']}
          labelStyle={{ color: '#f9f9f1' }}
        />
        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
