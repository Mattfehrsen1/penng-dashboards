'use client';

import React from 'react';
import { GlassCard } from './glass-card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  icon?: LucideIcon;
  accentColor?: 'cobalt' | 'orange' | 'purple' | 'green' | 'amber';
  description?: string;
  className?: string;
}

const accentColors = {
  cobalt: 'border-l-penng-cobalt text-penng-cobalt',
  orange: 'border-l-orange-500 text-orange-500',
  purple: 'border-l-purple-500 text-purple-500',
  green: 'border-l-green-500 text-green-500',
  amber: 'border-l-amber-500 text-amber-500',
};

export function MetricCard({
  title,
  value,
  unit,
  trend,
  icon: Icon,
  accentColor = 'cobalt',
  description,
  className,
}: MetricCardProps) {
  return (
    <GlassCard
      variant="hover"
      className={cn(
        'p-6 border-l-4',
        accentColors[accentColor].split(' ')[0],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm dark:text-neutral-400 text-neutral-600 font-medium mb-1">{title}</p>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold dark:text-white text-neutral-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-lg dark:text-neutral-400 text-neutral-600">{unit}</span>}
          </div>

          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={cn(
                  'font-medium',
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="dark:text-neutral-500 text-neutral-600">{trend.label}</span>
            </div>
          )}

          {description && (
            <p className="text-xs dark:text-neutral-500 text-neutral-600 mt-2">{description}</p>
          )}
        </div>

        {Icon && (
          <div
            className={cn(
              'p-3 rounded-lg dark:bg-white/5 bg-white/60',
              accentColors[accentColor].split(' ')[1]
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
