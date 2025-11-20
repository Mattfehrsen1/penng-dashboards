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
          strokeWidth={3}
          dot={{ fill: '#2735cf', r: 4 }}
          activeDot={{ r: 6, fill: '#2735cf' }}
          fill="url(#colorUsers)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
