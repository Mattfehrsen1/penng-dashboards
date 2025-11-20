'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { Users, TrendingUp, Activity, Moon, Heart } from 'lucide-react';

export default function DepartmentsPage() {
  const departments = [
    {
      name: 'Sales',
      employees: 10,
      active: 8,
      healthScore: 85,
      avgSteps: 10200,
      avgSleep: 7.4,
      avgRecovery: 78,
      workouts: 34,
      color: '#2735cf',
    },
    {
      name: 'Creative',
      employees: 20,
      active: 18,
      healthScore: 82,
      avgSteps: 9500,
      avgSleep: 7.1,
      avgRecovery: 75,
      workouts: 52,
      color: '#10B981',
    },
    {
      name: 'Production',
      employees: 15,
      active: 12,
      healthScore: 76,
      avgSteps: 8100,
      avgSleep: 6.8,
      avgRecovery: 70,
      workouts: 38,
      color: '#8B5CF6',
    },
    {
      name: 'Admin',
      employees: 5,
      active: 4,
      healthScore: 74,
      avgSteps: 7800,
      avgSleep: 7.2,
      avgRecovery: 72,
      workouts: 14,
      color: '#F59E0B',
    },
  ];

  const metrics = ['healthScore', 'avgSteps', 'avgSleep', 'avgRecovery'] as const;
  const metricLabels = {
    healthScore: 'Health Score',
    avgSteps: 'Avg Steps',
    avgSleep: 'Sleep (hrs)',
    avgRecovery: 'Recovery',
  };

  // Normalize values for heat map (0-100 scale)
  const normalize = (value: number, metric: string) => {
    switch (metric) {
      case 'healthScore':
      case 'avgRecovery':
        return value;
      case 'avgSteps':
        return Math.min((value / 12000) * 100, 100);
      case 'avgSleep':
        return Math.min((value / 8) * 100, 100);
      default:
        return value;
    }
  };

  const getHeatColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 70) return 'bg-lime-500';
    if (value >= 60) return 'bg-amber-500';
    if (value >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Department Comparison</h1>
        <p className="text-neutral-400">
          Compare health metrics and participation across all departments
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <GlassCard key={dept.name} variant="hover" className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{dept.name}</h3>
                <p className="text-sm text-neutral-400">
                  {dept.active}/{dept.employees} active
                </p>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dept.color }}
              ></div>
            </div>

            <div className="flex items-center justify-center my-6">
              <ProgressRing
                progress={dept.healthScore}
                size={100}
                color={dept.color}
                label="Health"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Steps</span>
                <span className="text-white font-semibold">{dept.avgSteps.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Sleep</span>
                <span className="text-white font-semibold">{dept.avgSleep} hrs</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Workouts</span>
                <span className="text-white font-semibold">{dept.workouts}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Heat Map */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Department Health Heat Map</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white font-semibold p-3">Department</th>
                {metrics.map((metric) => (
                  <th key={metric} className="text-center text-white font-semibold p-3">
                    {metricLabels[metric]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <span className="text-white font-medium">{dept.name}</span>
                    </div>
                  </td>
                  {metrics.map((metric) => {
                    const value = dept[metric];
                    const normalized = normalize(value, metric);
                    const color = getHeatColor(normalized);

                    let displayValue: string | number = value;
                    if (metric === 'avgSleep') displayValue = `${value} hrs`;
                    if (metric === 'avgSteps') displayValue = value.toLocaleString();

                    return (
                      <td key={metric} className="p-3">
                        <div
                          className={`${color} bg-opacity-20 border-2 ${color.replace('bg-', 'border-')} rounded-lg p-3 text-center`}
                        >
                          <span className="text-white font-bold">{displayValue}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
          <span className="text-sm text-neutral-400">Heat Scale:</span>
          {[
            { label: 'Excellent (80+)', color: 'bg-green-500' },
            { label: 'Good (70-79)', color: 'bg-lime-500' },
            { label: 'Fair (60-69)', color: 'bg-amber-500' },
            { label: 'Needs Attention (50-59)', color: 'bg-orange-500' },
            { label: 'Poor (<50)', color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <span className="text-xs text-neutral-400">{item.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Best Performing Metrics
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-white font-semibold">Health Score</p>
                  <p className="text-xs text-neutral-400">Sales leading at 85/100</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-penng-cobalt/10 rounded-lg border border-penng-cobalt/20">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-penng-cobalt" />
                <div>
                  <p className="text-white font-semibold">Daily Steps</p>
                  <p className="text-xs text-neutral-400">Sales averaging 10,200 steps</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-penng-cobalt" />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-white font-semibold">Sleep Quality</p>
                  <p className="text-xs text-neutral-400">Sales averaging 7.4 hours</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Areas for Improvement
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-white font-semibold">Production Sleep</p>
                  <p className="text-xs text-neutral-400">Down 12% from last month</p>
                </div>
              </div>
              <span className="text-amber-500 font-bold">-12%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-white font-semibold">Admin Participation</p>
                  <p className="text-xs text-neutral-400">Only 4/5 active employees</p>
                </div>
              </div>
              <span className="text-orange-500 font-bold">80%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-white font-semibold">Admin Steps</p>
                  <p className="text-xs text-neutral-400">Below target of 8,000 steps</p>
                </div>
              </div>
              <span className="text-red-500 font-bold">7,800</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
