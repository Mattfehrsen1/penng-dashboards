'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { Button } from '@/components/ui/button';
import { Building2, Bell, Shield, Users, Download } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-neutral-400">
          Manage company profile, notifications, and preferences
        </p>
      </div>

      {/* Company Profile */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-5 h-5 text-penng-cobalt" />
          <h2 className="text-xl font-bold text-white">Company Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Company Name</label>
            <input
              type="text"
              value="Cape Media"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-penng-cobalt"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Industry</label>
            <input
              type="text"
              value="Media & Creative"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-penng-cobalt"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Total Employees</label>
            <input
              type="text"
              value="50"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-penng-cobalt"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Program Start Date</label>
            <input
              type="text"
              value="August 20, 2024"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-penng-cobalt"
              readOnly
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <Button variant="gradient">Save Changes</Button>
        </div>
      </GlassCard>

      {/* Notification Preferences */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-penng-cobalt" />
          <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Weekly Summary Reports', enabled: true },
            { label: 'Challenge Completion Alerts', enabled: true },
            { label: 'Low Engagement Warnings', enabled: true },
            { label: 'Monthly ROI Reports', enabled: false },
            { label: 'Employee Milestones', enabled: true },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <span className="text-white">{item.label}</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.enabled ? 'bg-penng-cobalt' : 'bg-neutral-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Privacy & Security */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-penng-cobalt" />
          <h2 className="text-xl font-bold text-white">Privacy & Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-medium">Anonymize Employee Data</p>
              <p className="text-xs text-neutral-400 mt-1">
                Display aggregated data without individual identifiers
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-penng-cobalt">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-medium">Department Visibility</p>
              <p className="text-xs text-neutral-400 mt-1">
                Allow employees to see department comparisons
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-penng-cobalt">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Admin Management */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-penng-cobalt" />
            <h2 className="text-xl font-bold text-white">Admin Users</h2>
          </div>
          <Button variant="outline" size="sm">Add Admin</Button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Admin User', email: 'admin@capemedia.com', role: 'Owner' },
            { name: 'HR Manager', email: 'hr@capemedia.com', role: 'Admin' },
          ].map((admin) => (
            <div
              key={admin.email}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <p className="text-white font-medium">{admin.name}</p>
                <p className="text-xs text-neutral-400">{admin.email}</p>
              </div>
              <span className="px-3 py-1 bg-penng-cobalt/20 text-penng-cobalt text-xs font-semibold rounded-full">
                {admin.role}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Data Export */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-5 h-5 text-penng-cobalt" />
          <h2 className="text-xl font-bold text-white">Data Export</h2>
        </div>
        <p className="text-neutral-400 text-sm mb-6">
          Download your company&apos;s wellness data and reports
        </p>
        <div className="flex gap-4">
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Download PDF Report</Button>
        </div>
      </GlassCard>
    </div>
  );
}
