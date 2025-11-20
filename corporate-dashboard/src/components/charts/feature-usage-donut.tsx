'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface FeatureUsageDonutProps {
  data: {
    workoutsLogged: { count: number; percentage: number };
    nutritionTracking: { count: number; percentage: number };
    sleepLogging: { count: number; percentage: number };
    challenges: { count: number; percentage: number };
  };
}

const COLORS = {
  workoutsLogged: '#2735cf',
  nutritionTracking: '#10B981',
  sleepLogging: '#8B5CF6',
  challenges: '#F59E0B',
};

const LABELS = {
  workoutsLogged: 'Workouts Logged',
  nutritionTracking: 'Nutrition Tracking',
  sleepLogging: 'Sleep Logging',
  challenges: 'Challenges',
};

export function FeatureUsageDonut({ data }: FeatureUsageDonutProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: LABELS[key as keyof typeof LABELS],
    value: value.percentage,
    count: value.count,
    color: COLORS[key as keyof typeof COLORS],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(39, 53, 207, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(12px)',
          }}
          formatter={(value: number, name: string, props: any) => [
            `${value}% (${props.payload.count.toLocaleString()} uses)`,
            name,
          ]}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => <span style={{ color: '#a1a1aa', fontSize: '12px' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
