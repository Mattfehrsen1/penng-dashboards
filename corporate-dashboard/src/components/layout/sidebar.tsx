'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Trophy,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Engagement', href: '/dashboard/engagement', icon: TrendingUp },
  { label: 'ROI & Impact', href: '/dashboard/roi', icon: DollarSign },
  { label: 'Challenges', href: '/dashboard/challenges', icon: Trophy },
  { label: 'Departments', href: '/dashboard/departments', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
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
        'glass-card border-r border-white/10 h-screen sticky top-0 transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Image
              src="/logos/Penng_Icon_Blue.svg"
              alt="Penng"
              width={32}
              height={32}
            />
            <span className="text-white font-semibold text-lg">Penng</span>
          </div>
        )}
        {collapsed && (
          <Image
            src="/logos/Penng_Icon_Blue.svg"
            alt="Penng"
            width={32}
            height={32}
            className="mx-auto"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-white/5',
                isActive && 'bg-penng-cobalt/20 border-l-4 border-penng-cobalt',
                !isActive && 'border-l-4 border-transparent',
                collapsed && 'justify-center'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-penng-cobalt' : 'text-neutral-400'
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    'font-medium',
                    isActive ? 'text-white' : 'text-neutral-400'
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
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onToggle}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
            'hover:bg-white/5 transition-all duration-200 text-neutral-400',
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
