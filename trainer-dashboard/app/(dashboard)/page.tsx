'use client';

import { MetricCard } from '@/components/liquid-glass/metric-card';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { EngagementLineChart } from '@/components/charts/engagement-line-chart';
import { useAuthSession } from '@/hooks/use-session-trainer';
import { Users, TrendingUp, Activity, AlertCircle, Trophy, Calendar, MessageCircle } from 'lucide-react';

// Import mock data
import clientsData from '@/data/mock/trainer-clients.json';
import dailyMetrics from '@/data/mock/client-daily-metrics.json';
import progressData from '@/data/mock/client-progress.json';
import messagesData from '@/data/mock/messages.json';

export default function DashboardPage() {
  const { user, isLoading } = useAuthSession();

  const activeClients = clientsData.clients.filter((c) => c.isActive).length;
  const avgEngagement = Math.round(
    clientsData.clients.reduce((sum, c) => sum + c.compliance.overallScore, 0) / clientsData.clients.length
  );
  const clientsNeedingAttention = progressData.needingAttention.length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
          Trainer Dashboard
        </h1>
        <p className="dark:text-neutral-400 text-neutral-600 mt-2">
          {isLoading ? 'Loading...' : `Welcome back, ${user?.name || user?.email || 'Alex'}`}
        </p>
      </div>

      {/* Hero Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Active Clients"
          value={activeClients}
          unit={`/ ${clientsData.clients.length}`}
          icon={Users}
          accentColor="cobalt"
          trend={{
            value: 8,
            label: 'vs last month',
            isPositive: true,
          }}
          description="Clients actively engaged"
        />

        <MetricCard
          title="Clients Needing Attention"
          value={clientsNeedingAttention}
          icon={AlertCircle}
          accentColor="amber"
          description="Low compliance or inactive"
        />

        <MetricCard
          title="Avg Client Engagement"
          value={avgEngagement}
          unit="%"
          icon={TrendingUp}
          accentColor="green"
          trend={{
            value: 5,
            label: 'vs last week',
            isPositive: true,
          }}
          description="Overall compliance score"
        />

        <MetricCard
          title="Active Programs"
          value={20}
          icon={Activity}
          accentColor="purple"
          description="Workout & meal plans"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Engagement Chart */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4">
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Client Engagement Trend</h3>
              <p className="text-sm dark:text-neutral-400 text-neutral-600">Active clients over the last 30 days</p>
            </div>
            <EngagementLineChart
              data={dailyMetrics.dailyStats.map((d) => ({
                date: d.date,
                activeUsers: d.activeClients,
              }))}
            />
          </GlassCard>

          {/* Top Performers Leaderboard */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-neutral-900">Top Performers</h3>
                <p className="text-sm dark:text-neutral-400 text-neutral-600">Your highest achieving clients</p>
              </div>
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-3">
              {progressData.topPerformers.slice(0, 5).map((client, index) => (
                <div
                  key={client.clientId}
                  className="flex items-center justify-between p-3 rounded-lg dark:bg-white/5 bg-white/60 hover:dark:bg-white/10 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-cobalt text-white font-bold text-sm">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white text-neutral-900">{client.name}</p>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600">
                        {client.streakDays} day streak
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-penng-cobalt">{client.progressScore}%</p>
                    <p className="text-xs dark:text-neutral-400 text-neutral-600">
                      {client.weightChange > 0 ? '+' : ''}
                      {client.weightChange} lbs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="mb-4">
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Recent Client Achievements</h3>
              <p className="text-sm dark:text-neutral-400 text-neutral-600">Celebrate your clients' wins</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-white/5 bg-white/60">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-medium dark:text-white text-neutral-900">Brandon Campbell hit 50+ day streak!</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-white/5 bg-white/60">
                <div className="text-2xl">💪</div>
                <div>
                  <p className="font-medium dark:text-white text-neutral-900">Robert Taylor completed 5K personal best</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-white/5 bg-white/60">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-medium dark:text-white text-neutral-900">Emma Thompson reached target weight!</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600">1 day ago</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Avg Workout Completion</span>
                <div className="flex items-center gap-2">
                  <ProgressRing progress={83} size={40} strokeWidth={4} showPercentage={false} />
                  <span className="font-bold dark:text-white text-neutral-900">83%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Avg Meal Adherence</span>
                <div className="flex items-center gap-2">
                  <ProgressRing progress={85} size={40} strokeWidth={4} showPercentage={false} />
                  <span className="font-bold dark:text-white text-neutral-900">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Client Retention</span>
                <div className="flex items-center gap-2">
                  <ProgressRing progress={93} size={40} strokeWidth={4} showPercentage={false} />
                  <span className="font-bold dark:text-white text-neutral-900">93%</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Clients Falling Off Pace */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Needs Attention</h3>
            </div>
            <div className="space-y-3">
              {progressData.needingAttention.slice(0, 4).map((client) => (
                <div key={client.clientId} className="p-3 rounded-lg dark:bg-white/5 bg-white/60 border-l-2 border-amber-500">
                  <p className="font-medium dark:text-white text-neutral-900 text-sm">{client.name}</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-1">{client.reason}</p>
                  <p className="text-xs text-amber-500 mt-1 font-medium">{client.recommendedAction}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Upcoming Check-ins */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-penng-cobalt" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Upcoming Check-ins</h3>
            </div>
            <div className="space-y-3">
              {messagesData.upcomingCheckIns.slice(0, 3).map((checkin) => (
                <div key={checkin.id} className="p-3 rounded-lg dark:bg-white/5 bg-white/60">
                  <p className="font-medium dark:text-white text-neutral-900 text-sm">{checkin.clientName}</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-1">
                    {new Date(checkin.scheduledTime).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-xs text-penng-cobalt mt-1">{checkin.type}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Unread Messages */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-penng-cobalt" />
                <h3 className="text-lg font-bold dark:text-white text-neutral-900">Recent Messages</h3>
              </div>
              <span className="px-2 py-1 text-xs font-bold rounded-full bg-penng-cobalt text-white">
                {messagesData.unreadCount}
              </span>
            </div>
            <div className="space-y-2">
              {messagesData.recentMessages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${msg.isRead ? 'dark:bg-white/5 bg-white/60' : 'dark:bg-penng-cobalt/10 bg-penng-cobalt/5 border border-penng-cobalt/30'}`}
                >
                  <p className="font-medium dark:text-white text-neutral-900 text-sm">{msg.clientName}</p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-1 line-clamp-1">{msg.preview}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
