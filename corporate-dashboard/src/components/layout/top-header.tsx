'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search, User } from 'lucide-react';
import { GlassCard } from '@/components/liquid-glass/glass-card';

export function TopHeader() {
  return (
    <header className="sticky top-0 z-40 glass-card border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Company Name */}
        <div>
          <h1 className="text-xl font-bold text-white">Cape Media</h1>
          <p className="text-sm text-neutral-400">Corporate Wellness Dashboard</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-penng-cobalt w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-neutral-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-penng-cobalt rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-neutral-400">HR Manager</p>
            </div>
            <button className="p-2 bg-penng-cobalt/20 rounded-lg hover:bg-penng-cobalt/30 transition-colors">
              <User className="w-5 h-5 text-penng-cobalt" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
