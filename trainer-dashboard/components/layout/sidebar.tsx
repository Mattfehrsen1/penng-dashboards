'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Trophy,
  MessageCircle,
  Users,
  UtensilsCrossed,
  Dumbbell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Client Progress', href: '/client-progress', icon: TrendingUp },
  { label: 'Leaderboards', href: '/leaderboards', icon: Trophy },
  { label: 'Messages', href: '/messages', icon: MessageCircle },
  { label: 'Clients', href: '/clients', icon: Users },
  { label: 'Meal Plans', href: '/meal-plans', icon: UtensilsCrossed },
  { label: 'Workout Programs', href: '/workout-programs', icon: Dumbbell },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'glass-card border-r dark:border-white/10 border-neutral-200 h-screen sticky top-0 transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b dark:border-white/10 border-neutral-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-cobalt flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="dark:text-white text-neutral-900 font-semibold text-lg">Penng Trainer</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-cobalt flex items-center justify-center text-white font-bold text-lg mx-auto">
            P
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:dark:bg-white/5 hover:bg-white/60',
                isActive && 'dark:bg-penng-cobalt/20 bg-penng-cobalt/10 border-l-4 border-penng-cobalt',
                !isActive && 'border-l-4 border-transparent',
                collapsed && 'justify-center'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-penng-cobalt' : 'dark:text-neutral-400 text-neutral-600'
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    'font-medium',
                    isActive ? 'dark:text-white text-penng-cobalt' : 'dark:text-neutral-400 text-neutral-600'
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t dark:border-white/10 border-neutral-200">
        <button
          onClick={onToggle}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
            'hover:dark:bg-white/5 hover:bg-white/60 transition-all duration-200 dark:text-neutral-400 text-neutral-600',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
