'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { ClientProgressBar } from '@/components/charts/client-progress-bar';
import { EngagementLineChart } from '@/components/charts/engagement-line-chart';
import { TrendingUp, TrendingDown, Target, Users, Award, AlertTriangle } from 'lucide-react';

// Import mock data
import progressData from '@/data/mock/client-progress.json';
import clientsData from '@/data/mock/trainer-clients.json';

export default function ClientProgressPage() {
  // Calculate progress metrics
  const avgWeightChange = progressData.progressSummary.avgWeightChange;
  const avgHealthScoreIncrease = progressData.progressSummary.avgHealthScoreIncrease;

  // Top 10 clients by health score
  const topClientsByHealth = [...clientsData.clients]
    .sort((a, b) => b.healthScore - a.healthScore)
    .slice(0, 10)
    .map((client) => ({
      name: client.name.split(' ')[0],
      value: client.healthScore,
      color: client.healthScore >= 90 ? '#10B981' : client.healthScore >= 75 ? '#2735cf' : '#F59E0B',
    }));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
          Client Progress
        </h1>
        <p className="dark:text-neutral-400 text-neutral-600 mt-2">
          Track and analyze your clients' progress over time
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Clients Reached Goals"
          value={progressData.progressSummary.clientsReachedGoals}
          unit={`/ ${progressData.progressSummary.totalClientsWithProgress}`}
          icon={Target}
          accentColor="green"
          description="Successfully completed goals"
        />

        <MetricCard
          title="Clients On Track"
          value={progressData.progressSummary.clientsOnTrack}
          icon={TrendingUp}
          accentColor="cobalt"
          description="Making steady progress"
        />

        <MetricCard
          title="Need Attention"
          value={progressData.progressSummary.clientsNeedingAttention}
          icon={AlertTriangle}
          accentColor="amber"
          description="Falling behind on goals"
        />

        <MetricCard
          title="Avg Health Score Increase"
          value={`+${avgHealthScoreIncrease}`}
          icon={Award}
          accentColor="purple"
          trend={{
            value: 8,
            label: 'vs last month',
            isPositive: true,
          }}
          description="Average improvement"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Performers */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4">
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Top 10 Clients by Health Score</h3>
              <p className="text-sm dark:text-neutral-400 text-neutral-600">Highest performing clients</p>
            </div>
            <ClientProgressBar data={topClientsByHealth} tooltipLabel="Health Score" />
          </GlassCard>

          {/* Weekly Progress Trend */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4">
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Weekly Compliance Trend</h3>
              <p className="text-sm dark:text-neutral-400 text-neutral-600">Average client compliance over 6 weeks</p>
            </div>
            <EngagementLineChart
              data={progressData.weeklyProgressData.map((week) => ({
                date: week.week,
                activeUsers: week.avgCompliance,
              }))}
            />
          </GlassCard>

          {/* Detailed Progress Table */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="mb-4">
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Top Performers Details</h3>
              <p className="text-sm dark:text-neutral-400 text-neutral-600">Best performing clients this period</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-white/10 border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Rank</th>
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Client</th>
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Progress Score</th>
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Weight Change</th>
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Health Score ↑</th>
                    <th className="text-left py-3 px-4 font-medium dark:text-neutral-400 text-neutral-600">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.topPerformers.map((client, index) => (
                    <tr key={client.clientId} className="border-b dark:border-white/5 border-neutral-100">
                      <td className="py-3 px-4">
                        <span className="text-xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                        </span>
                      </td>
                      <td className="py-3 px-4 dark:text-white text-neutral-900 font-medium">{client.name}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-green-500">{client.progressScore}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${client.weightChange < 0 ? 'text-green-500' : 'text-penng-cobalt'}`}>
                          {client.weightChange > 0 ? '+' : ''}
                          {client.weightChange} lbs
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-green-500">+{client.healthScoreIncrease}</span>
                      </td>
                      <td className="py-3 px-4 dark:text-white text-neutral-900">{client.streakDays} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Progress Summary */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">Progress Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm dark:text-neutral-400 text-neutral-600">Goal Completion Rate</span>
                  <span className="font-bold dark:text-white text-neutral-900">
                    {Math.round((progressData.progressSummary.clientsReachedGoals / progressData.progressSummary.totalClientsWithProgress) * 100)}%
                  </span>
                </div>
                <ProgressRing
                  progress={Math.round((progressData.progressSummary.clientsReachedGoals / progressData.progressSummary.totalClientsWithProgress) * 100)}
                  size={120}
                  strokeWidth={8}
                  className="mx-auto"
                />
              </div>

              <div className="pt-4 border-t dark:border-white/10 border-neutral-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm dark:text-neutral-400 text-neutral-600">Avg Weight Change</span>
                  <span className={`font-bold ${avgWeightChange < 0 ? 'text-green-500' : 'text-neutral-900 dark:text-white'}`}>
                    {avgWeightChange} lbs
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {avgWeightChange < 0 ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Weight loss trend</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 text-penng-cobalt" />
                      <span className="text-penng-cobalt">Muscle gain trend</span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t dark:border-white/10 border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-neutral-400 text-neutral-600">Clients with Progress</span>
                  <span className="font-bold dark:text-white text-neutral-900">
                    {progressData.progressSummary.totalClientsWithProgress}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Clients Needing Attention */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Needs Attention</h3>
            </div>
            <div className="space-y-3">
              {progressData.needingAttention.map((client) => (
                <div key={client.clientId} className="p-3 rounded-lg dark:bg-white/5 bg-white/60 border-l-2 border-amber-500">
                  <p className="font-medium dark:text-white text-neutral-900 text-sm">{client.name}</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-1">{client.reason}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-amber-500 font-medium">{client.recommendedAction}</span>
                    <span className="text-xs dark:text-neutral-500 text-neutral-600">
                      Score: {client.complianceScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Weekly Progress Stats */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">Weekly Breakdown</h3>
            <div className="space-y-3">
              {progressData.weeklyProgressData.slice(-4).reverse().map((week) => (
                <div key={week.week} className="p-3 rounded-lg dark:bg-white/5 bg-white/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium dark:text-white text-neutral-900">{week.week}</span>
                    <span className={`text-sm font-bold ${week.avgCompliance >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
                      {week.avgCompliance}%
                    </span>
                  </div>
                  <div className="text-xs dark:text-neutral-400 text-neutral-600">
                    Weight: {week.avgWeightChange} lbs avg
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
