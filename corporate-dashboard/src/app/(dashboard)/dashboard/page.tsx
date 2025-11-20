'use client';

import { MetricCard } from '@/components/liquid-glass/metric-card';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { Button } from '@/components/ui/button';
import { EngagementLineChart } from '@/components/charts/engagement-line-chart';
import {
  Users,
  Activity,
  TrendingUp,
  Heart,
  AlertCircle,
  Trophy,
  Zap
} from 'lucide-react';

// Import mock data
import companyData from '@/data/mock/company.json';
import employeesData from '@/data/mock/employees.json';
import dailyEngagementData from '@/data/mock/daily-engagement.json';
import challengesData from '@/data/mock/challenges.json';

export default function DashboardPage() {
  // Calculate current metrics from data
  const activeEmployees = employeesData.filter((emp) => emp.isActive).length;
  const totalEmployees = companyData.employeeCount;
  const participationRate = Math.round((activeEmployees / totalEmployees) * 100);

  // Get latest daily stats
  const latestDay = dailyEngagementData.dailyStats[dailyEngagementData.dailyStats.length - 1];
  const avgSteps = latestDay.avgSteps;

  // Calculate average health score
  const avgHealthScore = Math.round(
    employeesData.filter((emp) => emp.isActive).reduce((sum, emp) => sum + emp.healthScore, 0) / activeEmployees
  );

  // Get department data
  const departments = companyData.departments.map((dept) => {
    const deptEmployees = employeesData.filter((emp) => emp.department === dept.id);
    const activeDeptEmployees = deptEmployees.filter((emp) => emp.isActive);
    const avgDeptScore = activeDeptEmployees.length > 0
      ? Math.round(activeDeptEmployees.reduce((sum, emp) => sum + emp.healthScore, 0) / activeDeptEmployees.length)
      : 0;

    return {
      ...dept,
      active: activeDeptEmployees.length,
      score: avgDeptScore,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-8xl font-bold text-white mb-4 tracking-tight">{companyData.name}&apos;s Overview</h1>
        <p className="text-neutral-400 text-xl font-semibold uppercase tracking-[0.12rem]">
          3-month wellness program progress
        </p>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        <MetricCard
          title="Active Employees"
          value={activeEmployees}
          unit={`/ ${totalEmployees}`}
          trend={{ value: 15, label: 'vs last month', isPositive: true }}
          icon={Users}
          accentColor="cobalt"
          description={`${participationRate}% participation rate`}
        />
        <MetricCard
          title="Avg Daily Steps"
          value={avgSteps.toLocaleString()}
          trend={{ value: 8, label: 'above target', isPositive: true }}
          icon={Activity}
          accentColor="orange"
          description="Target: 8,000 steps"
        />
        <MetricCard
          title="Engagement Rate"
          value={participationRate}
          unit="%"
          trend={{ value: 12, label: 'vs last week', isPositive: true }}
          icon={TrendingUp}
          accentColor="green"
          description="Highly engaged workforce"
        />
        <MetricCard
          title="Health Score"
          value={avgHealthScore}
          unit="/ 100"
          trend={{ value: 5, label: 'improving', isPositive: true }}
          icon={Heart}
          accentColor="purple"
          description="Company-wide average"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Engagement Trend */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Engagement Trends (90 Days)
            </h2>
            <EngagementLineChart data={dailyEngagementData.dailyStats} />
          </GlassCard>

          {/* Department Snapshot */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Department Health Snapshot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-penng-cobalt/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{dept.name}</h3>
                    <span className="text-sm text-neutral-400">
                      {dept.active}/{dept.employeeCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <ProgressRing
                      progress={(dept.active / dept.employeeCount) * 100}
                      size={60}
                      strokeWidth={6}
                      showPercentage={false}
                      color={dept.color}
                    />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {dept.score}
                      </p>
                      <p className="text-xs text-neutral-400">Health Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              This Week
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Zap className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Workouts</p>
                    <p className="text-lg font-bold text-white">89</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">+12%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Heart className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Avg Sleep</p>
                    <p className="text-lg font-bold text-white">7.2 hrs</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">+0.3</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Activity className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Active Days</p>
                    <p className="text-lg font-bold text-white">294</p>
                  </div>
                </div>
                <span className="text-xs text-neutral-500">Total</span>
              </div>
            </div>
          </GlassCard>

          {/* Active Challenges */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                Active Challenges
              </h2>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-3">
              {challengesData.slice(0, 2).map((challenge) => (
                <div key={challenge.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm font-semibold text-white mb-1">
                    {challenge.icon} {challenge.name}
                  </p>
                  <p className="text-xs text-neutral-400 mb-2">
                    {challenge.participants} participants
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-penng-cobalt h-2 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{challenge.progress}% complete • {challenge.daysLeft} days left</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Challenges
            </Button>
          </GlassCard>

          {/* Alerts */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white">
                Alerts
              </h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-sm text-amber-200">
                  Production dept sleep down 12%
                </p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-sm text-red-200">
                  5 employees reporting high stress
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
