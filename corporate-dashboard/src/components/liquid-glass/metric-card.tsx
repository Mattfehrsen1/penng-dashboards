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
  cobalt: 'border-[#5B7BB4] bg-[#5B7BB4] text-[#5B7BB4]',
  orange: 'border-[#D4915D] bg-[#D4915D] text-[#D4915D]',
  purple: 'border-[#9B7BA5] bg-[#9B7BA5] text-[#9B7BA5]',
  green: 'border-[#7B9B7A] bg-[#7B9B7A] text-[#7B9B7A]',
  amber: 'border-[#C9A66B] bg-[#C9A66B] text-[#C9A66B]',
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
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Top Container - Title */}
      <div
        className={cn(
          'p-6 border-2 bg-black',
          accentColors[accentColor].split(' ')[0]
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />}
          <p className="text-3xl text-white font-semibold tracking-tight whitespace-nowrap">{title}</p>
        </div>
      </div>

      {/* Bottom Container - Value */}
      <div
        className={cn(
          'p-8 border-2 flex-1',
          accentColors[accentColor].split(' ')[0],
          accentColors[accentColor].split(' ')[1]
        )}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-9xl font-semibold text-black tracking-tighter leading-none">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-4xl text-black font-semibold tracking-tighter">{unit}</span>}
          </div>

          {trend && (
            <div className="flex items-center gap-1 text-xl">
              <span
                className={cn(
                  'font-semibold',
                  trend.isPositive ? 'text-black' : 'text-black'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-black/70 font-semibold">{trend.label}</span>
            </div>
          )}

          {description && (
            <p className="text-2xl text-black/70 mt-2 font-semibold tracking-tight">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
