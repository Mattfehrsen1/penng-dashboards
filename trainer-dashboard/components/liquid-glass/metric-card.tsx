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
  index?: number; // For progressive color lightening
}

// Progressive blue shades - getting lighter from left to right
const getProgressiveBlue = (index: number = 0) => {
  const blues = [
    '#2735cf', // Original darkest blue
    '#3545d9', // Slightly lighter
    '#4355e3', // Medium light
    '#5165ed', // Lighter
    '#5f75f7', // Lightest
  ];
  return blues[Math.min(index, blues.length - 1)];
};

const accentColors = {
  cobalt: 'border-l-4',
  orange: 'border-l-4',
  purple: 'border-l-4',
  green: 'border-l-4',
  amber: 'border-l-4',
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
  index = 0,
}: MetricCardProps) {
  const blueColor = getProgressiveBlue(index);

  return (
    <GlassCard
      variant="hover"
      className={cn(
        'p-6 relative overflow-hidden',
        accentColors[accentColor],
        className
      )}
      style={{
        borderLeftColor: blueColor,
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 dark:from-white/5 dark:via-transparent dark:to-black/20 pointer-events-none" />

      <div className="relative">
        <div className="flex-1">
          <p className="text-sm dark:text-neutral-400 text-neutral-600 font-semibold mb-1 tracking-tighter text-left">{title}</p>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold dark:text-white/90 text-neutral-900/90 mix-blend-soft-light">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-lg dark:text-neutral-400/90 text-neutral-600/90 mix-blend-soft-light">{unit}</span>}
          </div>

          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  'font-semibold',
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="dark:text-neutral-500 text-neutral-600 font-semibold">{trend.label}</span>
            </div>
          )}

          {description && (
            <p className="text-xs dark:text-neutral-500 text-neutral-600 mt-2 font-semibold">{description}</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
