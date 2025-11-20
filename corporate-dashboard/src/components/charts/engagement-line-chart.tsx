'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EngagementLineChartProps {
  data: Array<{
    date: string;
    activeUsers: number;
  }>;
}

export function EngagementLineChart({ data }: EngagementLineChartProps) {
  // Format data for chart - show every 5th day to avoid clutter
  const chartData = data
    .filter((_, index) => index % 5 === 0)
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      users: item.activeUsers,
    }));

  // Calculate min and max for vertical exaggeration
  const values = chartData.map(d => d.users);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  const yMin = Math.floor(minValue - range * 0.1);
  const yMax = Math.ceil(maxValue + range * 0.1);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2735cf" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2735cf" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="date"
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#a1a1aa"
          style={{ fontSize: '12px' }}
          domain={[yMin, yMax]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(39, 53, 207, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(12px)',
          }}
          labelStyle={{ color: '#f9f9f1' }}
          itemStyle={{ color: '#2735cf' }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#2735cf"
          strokeWidth={1.5}
          dot={{ fill: '#2735cf', r: 3 }}
          activeDot={{ r: 5, fill: '#2735cf' }}
          fill="url(#colorUsers)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
