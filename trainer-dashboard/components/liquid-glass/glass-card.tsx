import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'bordered';
  children: React.ReactNode;
  useTheme?: boolean; // Use this to auto-switch between dark/light glass styles
}

export function GlassCard({
  variant = 'default',
  className,
  children,
  useTheme = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        useTheme ? 'dark:glass-card glass-card-light' : 'glass-card',
        variant === 'hover' && (useTheme ? 'dark:glass-card-hover glass-card-hover-light' : 'glass-card-hover'),
        variant === 'bordered' && 'border-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
