'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { CostSavingsBar } from '@/components/charts/cost-savings-bar';
import { DollarSign, TrendingUp, Heart, Users, Activity, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import mock data
import roiData from '@/data/mock/roi-metrics.json';
import companyData from '@/data/mock/company.json';

export default function ROIPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ROI & Impact</h1>
          <p className="text-neutral-400">
            3-month wellness program results for {companyData.name}
          </p>
        </div>
        <Button variant="gradient">
          Download Report
        </Button>
      </div>

      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 border-l-4 border-amber-500">
          <p className="text-neutral-400 text-sm mb-2">Total Investment</p>
          <p className="text-4xl font-bold text-white mb-1">${roiData.investment.totalInvestment.toLocaleString()}</p>
          <p className="text-xs text-neutral-500">Platform + rewards</p>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-green-500">
          <p className="text-neutral-400 text-sm mb-2">Projected Savings</p>
          <p className="text-4xl font-bold text-white mb-1">${roiData.projectedSavings.annual.toLocaleString()}</p>
          <p className="text-xs text-green-500">Annual projection</p>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-penng-cobalt">
          <p className="text-neutral-400 text-sm mb-2">ROI</p>
          <p className="text-4xl font-bold text-penng-cobalt mb-1">{roiData.roi.percentage}%</p>
          <p className="text-xs text-neutral-500">Return on investment</p>
        </GlassCard>
      </div>

      {/* Health Impact Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Health Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Employees Improved"
            value={38}
            unit="/ 42"
            trend={{ value: 90, label: 'showing improvement', isPositive: true }}
            icon={Heart}
            accentColor="green"
          />
          <MetricCard
            title="Avg Weight Loss"
            value="3.2"
            unit="lbs"
            trend={{ value: 2.1, label: 'per employee', isPositive: true }}
            icon={TrendingUp}
            accentColor="orange"
          />
          <MetricCard
            title="Sleep Increase"
            value="+0.6"
            unit="hrs"
            trend={{ value: 8.5, label: 'up from 7.9 hrs', isPositive: true }}
            icon={Moon}
            accentColor="purple"
          />
        </div>
      </div>

      {/* Before/After Comparison */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Before vs After Program (3 Months)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500/50 rounded-full"></span>
              Before Program
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Avg Sick Days/Year', value: '8.2' },
                { label: 'Absenteeism Rate', value: '3.2%' },
                { label: 'Daily Steps', value: '6,200' },
                { label: 'Health Score', value: '68/100' },
                { label: 'High Stress Employees', value: '18' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                  <span className="text-neutral-400 text-sm">{item.label}</span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              After Program
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Avg Sick Days/Year', value: '6.4', improvement: '-22%' },
                { label: 'Absenteeism Rate', value: '2.5%', improvement: '-22%' },
                { label: 'Daily Steps', value: '8,547', improvement: '+38%' },
                { label: 'Health Score', value: '78/100', improvement: '+15%' },
                { label: 'High Stress Employees', value: '8', improvement: '-56%' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                  <span className="text-neutral-400 text-sm">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{item.value}</span>
                    <span className="text-green-500 text-xs font-medium">{item.improvement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Cost Savings Breakdown
          </h2>
          <CostSavingsBar data={roiData.projectedSavings.breakdown} />
          <div className="space-y-3 mt-4">
            {Object.entries(roiData.projectedSavings.breakdown).map(([key, amount]) => {
              const labels: Record<string, string> = {
                reducedAbsenteeism: 'Reduced Absenteeism',
                healthInsurance: 'Health Insurance',
                productivityGains: 'Productivity Gains'
              };
              const colors: Record<string, string> = {
                reducedAbsenteeism: 'bg-green-500',
                healthInsurance: 'bg-blue-500',
                productivityGains: 'bg-purple-500'
              };
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors[key]}`}></div>
                    <span className="text-neutral-400 text-sm">{labels[key]}</span>
                  </div>
                  <span className="text-white font-semibold">${(amount as number).toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Productivity Impact
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400">Engagement Increase</span>
                <span className="text-white font-bold">+28%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-penng-cobalt h-3 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400">Energy Levels</span>
                <span className="text-white font-bold">+35%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400">Focus & Concentration</span>
                <span className="text-white font-bold">+22%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-penng-cobalt/10 rounded-lg border border-penng-cobalt/20">
              <p className="text-sm text-neutral-300 mb-2">Estimated Annual Value</p>
              <p className="text-3xl font-bold text-penng-cobalt">$78,400</p>
              <p className="text-xs text-neutral-400 mt-1">Based on increased productivity</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Key Insights */}
      <GlassCard className="p-6 bg-gradient-to-br from-penng-cobalt/10 to-transparent border-penng-cobalt/20">
        <h2 className="text-xl font-bold text-white mb-4">
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg mt-1">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">90% Improvement Rate</h3>
              <p className="text-neutral-400 text-sm">38 out of 42 active employees showing measurable health improvements</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-penng-cobalt/20 rounded-lg mt-1">
              <DollarSign className="w-5 h-5 text-penng-cobalt" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Quick ROI Timeline</h3>
              <p className="text-neutral-400 text-sm">Investment recouped in 5.2 months based on current trends</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg mt-1">
              <Activity className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Culture Shift</h3>
              <p className="text-neutral-400 text-sm">84% of employees report improved work-life balance</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Sustained Growth</h3>
              <p className="text-neutral-400 text-sm">Engagement increasing month-over-month with no plateau</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
