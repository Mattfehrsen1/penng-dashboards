'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { EngagementLineChart } from '@/components/charts/engagement-line-chart';
import { FeatureUsageDonut } from '@/components/charts/feature-usage-donut';
import { Users, TrendingUp, Activity, Zap, Calendar } from 'lucide-react';

// Import mock data
import dailyEngagementData from '@/data/mock/daily-engagement.json';
import employeesData from '@/data/mock/employees.json';

export default function EngagementPage() {
  // Calculate metrics from data
  const avgDailyActiveUsers = dailyEngagementData.overview.avgDailyActiveUsers;
  const totalInteractions = dailyEngagementData.featureUsage.workoutsLogged.count +
    dailyEngagementData.featureUsage.nutritionTracking.count +
    dailyEngagementData.featureUsage.sleepLogging.count +
    dailyEngagementData.featureUsage.challenges.count;

  const activeStreakEmployees = employeesData.filter((emp) => emp.currentStreak >= 7).length;
  const topStreakers = employeesData
    .filter((emp) => emp.isActive)
    .sort((a, b) => b.currentStreak - a.currentStreak)
    .slice(0, 5);

  const weeklyEngagement = 84; // This could be calculated from weekly data if available
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Engagement Analytics</h1>
        <p className="text-neutral-400">
          Track employee participation and activity trends over 3 months
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Daily Active Users"
          value={avgDailyActiveUsers}
          unit="avg"
          trend={{ value: 12, label: 'vs last month', isPositive: true }}
          icon={Users}
          accentColor="cobalt"
          description="76% daily participation"
        />
        <MetricCard
          title="Weekly Engagement"
          value={weeklyEngagement}
          unit="%"
          trend={{ value: 8, label: 'improvement', isPositive: true }}
          icon={TrendingUp}
          accentColor="green"
          description="Consistent growth"
        />
        <MetricCard
          title="Feature Usage"
          value={totalInteractions.toLocaleString()}
          trend={{ value: 15, label: 'total interactions', isPositive: true }}
          icon={Activity}
          accentColor="orange"
          description="Last 90 days"
        />
        <MetricCard
          title="Active Streaks"
          value={activeStreakEmployees}
          unit="users"
          trend={{ value: 5, label: 'new streaks', isPositive: true }}
          icon={Zap}
          accentColor="purple"
          description="7+ days active"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users Trend */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Daily Active Users (90 Days)
          </h2>
          <EngagementLineChart data={dailyEngagementData.dailyStats} />
          <div className="mt-4 flex items-center justify-between text-sm">
            <div>
              <p className="text-neutral-400">Average</p>
              <p className="text-white font-semibold">{dailyEngagementData.overview.avgDailyActiveUsers} users/day</p>
            </div>
            <div>
              <p className="text-neutral-400">Peak</p>
              <p className="text-white font-semibold">{dailyEngagementData.overview.peakDailyActiveUsers} users</p>
            </div>
            <div>
              <p className="text-neutral-400">Low</p>
              <p className="text-white font-semibold">{dailyEngagementData.overview.lowDailyActiveUsers} users</p>
            </div>
          </div>
        </GlassCard>

        {/* Feature Usage Breakdown */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Feature Usage Breakdown
          </h2>
          <FeatureUsageDonut data={dailyEngagementData.featureUsage} />
        </GlassCard>
      </div>

      {/* Department Participation */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Department Participation Rates
        </h2>
        <div className="space-y-4">
          {dailyEngagementData.departmentParticipation.map((dept) => (
            <div key={dept.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{dept.name}</span>
                <span className="text-neutral-400 text-sm">
                  {dept.active}/{dept.total} active • {dept.rate}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-penng-cobalt h-3 rounded-full transition-all duration-500"
                  style={{ width: `${dept.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Streaks & Consistency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Active Streaks Distribution
          </h2>
          <div className="h-48 flex items-center justify-center border border-white/10 rounded-lg">
            <p className="text-neutral-500">📊 Histogram: Streak lengths</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-neutral-400">7+ days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">18</p>
              <p className="text-xs text-neutral-400">14+ days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-neutral-400">30+ days</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Top Streakers
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', dept: 'Sales', streak: 67, avatar: '👩' },
              { name: 'Marcus Chen', dept: 'Creative', streak: 58, avatar: '👨' },
              { name: 'Emily Rodriguez', dept: 'Production', streak: 52, avatar: '👩' },
              { name: 'David Park', dept: 'Sales', streak: 48, avatar: '👨' },
              { name: 'Lisa Anderson', dept: 'Creative', streak: 45, avatar: '👩' },
            ].map((person, idx) => (
              <div
                key={person.name}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{person.avatar}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{person.name}</p>
                    <p className="text-neutral-400 text-xs">{person.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{person.streak}</p>
                  <p className="text-xs text-neutral-400">days</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
