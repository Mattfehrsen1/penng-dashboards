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
  cobalt: 'border-current',
  orange: 'border-current',
  purple: 'border-current',
  green: 'border-current',
  amber: 'border-current',
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
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Top Container - Title */}
      <div
        className={cn(
          'p-6 border-2 rounded-2xl relative overflow-hidden',
          accentColors[accentColor]
        )}
        style={{
          backgroundColor: blueColor,
          borderColor: blueColor,
          color: blueColor
        }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

        <div className="relative">
          <p className="text-3xl text-white font-semibold tracking-tighter text-left">{title}</p>
        </div>
      </div>

      {/* Bottom Container - Value */}
      <div
        className={cn(
          'pt-4 pl-4 pr-8 pb-8 border-2 flex-1 rounded-2xl relative overflow-hidden',
          accentColors[accentColor]
        )}
        style={{
          backgroundColor: blueColor,
          borderColor: blueColor,
        }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

        <div className="flex flex-col h-full justify-between relative">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-9xl font-normal text-white/90 tracking-tighter leading-none mix-blend-soft-light">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-5xl text-white/90 font-normal tracking-tighter mix-blend-soft-light">{unit}</span>}
          </div>

          {trend && (
            <div className="flex items-center gap-1 text-2xl">
              <span
                className={cn(
                  'font-semibold tracking-tight',
                  trend.isPositive ? 'text-green-400' : 'text-red-400'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-white/70 font-semibold tracking-tight">{trend.label}</span>
            </div>
          )}

          {description && (
            <p className="text-2xl text-white/70 mt-2 font-semibold tracking-tight">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
