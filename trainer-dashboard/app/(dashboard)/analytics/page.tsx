'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { EngagementLineChart } from '@/components/charts/engagement-line-chart';
import { FeatureUsageDonut } from '@/components/charts/feature-usage-donut';
import { ClientProgressBar } from '@/components/charts/client-progress-bar';
import { TrendingUp, Activity, Users, Calendar } from 'lucide-react';

// Import mock data
import dailyMetrics from '@/data/mock/client-daily-metrics.json';
import clientsData from '@/data/mock/trainer-clients.json';

export default function AnalyticsPage() {
  // Calculate team breakdown
  const teamBreakdown = clientsData.clients.reduce((acc, client) => {
    const team = client.team;
    if (!acc[team]) {
      acc[team] = 0;
    }
    acc[team]++;
    return acc;
  }, {} as Record<string, number>);

  const teamData = Object.entries(teamBreakdown).map(([name, value], index) => ({
    name,
    value,
    color: ['#2735cf', '#10B981', '#F59E0B'][index % 3],
  }));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
          Analytics
        </h1>
        <p className="dark:text-neutral-400 text-neutral-600 mt-2">
          Comprehensive insights into client engagement and performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Daily Active Clients"
          value={dailyMetrics.overview.avgDailyActiveClients}
          unit={`/ ${dailyMetrics.overview.totalClients}`}
          icon={Users}
          accentColor="cobalt"
          description="Average daily engagement"
        />

        <MetricCard
          title="Peak Engagement"
          value={dailyMetrics.overview.peakDailyActiveClients}
          icon={TrendingUp}
          accentColor="green"
          description="Highest daily active clients"
        />

        <MetricCard
          title="Total Workouts Logged"
          value={dailyMetrics.featureUsage.workoutsLogged.count}
          icon={Activity}
          accentColor="purple"
          trend={{
            value: 12,
            label: 'vs last period',
            isPositive: true,
          }}
          description="In the last 30 days"
        />

        <MetricCard
          title="Meals Tracked"
          value={dailyMetrics.featureUsage.nutritionTracking.count}
          icon={Calendar}
          accentColor="orange"
          trend={{
            value: 8,
            label: 'vs last period',
            isPositive: true,
          }}
          description="In the last 30 days"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Engagement Trend */}
        <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-4">
            <h3 className="text-xl font-bold dark:text-white text-neutral-900">30-Day Engagement Trend</h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">Daily active client count</p>
          </div>
          <EngagementLineChart
            data={dailyMetrics.dailyStats.map((d) => ({
              date: d.date,
              activeUsers: d.activeClients,
            }))}
          />
        </GlassCard>

        {/* Feature Usage Breakdown */}
        <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="mb-4">
            <h3 className="text-xl font-bold dark:text-white text-neutral-900">Feature Usage Distribution</h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">How clients interact with the app</p>
          </div>
          <FeatureUsageDonut data={dailyMetrics.featureUsage} />
        </GlassCard>

        {/* Client Distribution by Team */}
        <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="mb-4">
            <h3 className="text-xl font-bold dark:text-white text-neutral-900">Client Distribution by Team</h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">Breakdown across groups</p>
          </div>
          <ClientProgressBar
            data={teamData}
            tooltipLabel="Clients"
          />
        </GlassCard>

        {/* Compliance Trends */}
        <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="mb-4">
            <h3 className="text-xl font-bold dark:text-white text-neutral-900">Average Compliance Trends</h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">Client adherence over time</p>
          </div>
          <EngagementLineChart
            data={dailyMetrics.dailyStats.map((d) => ({
              date: d.date,
              activeUsers: d.avgCompliance,
            }))}
          />
        </GlassCard>
      </div>

      {/* Detailed Stats Table */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="mb-4">
          <h3 className="text-xl font-bold dark:text-white text-neutral-900">Detailed Engagement Stats</h3>
          <p className="text-sm dark:text-neutral-400 text-neutral-600">Last 7 days breakdown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-white/10 border-neutral-200">
                <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Date</th>
                <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Active Clients</th>
                <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Workouts</th>
                <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Meals Tracked</th>
                <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Avg Compliance</th>
              </tr>
            </thead>
            <tbody>
              {dailyMetrics.dailyStats.slice(-7).reverse().map((day) => (
                <tr key={day.date} className="border-b dark:border-white/5 border-neutral-100">
                  <td className="py-3 px-4 dark:text-white text-neutral-900">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-4 dark:text-white text-neutral-900">{day.activeClients}</td>
                  <td className="py-3 px-4 dark:text-white text-neutral-900">{day.workoutsLogged}</td>
                  <td className="py-3 px-4 dark:text-white text-neutral-900">{day.mealsTracked}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${day.avgCompliance >= 80 ? 'text-green-500' : day.avgCompliance >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      {day.avgCompliance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
