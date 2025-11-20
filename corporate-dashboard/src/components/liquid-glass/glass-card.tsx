import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'bordered';
  children: React.ReactNode;
}

export function GlassCard({
  variant = 'default',
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        variant === 'hover' && 'glass-card-hover',
        variant === 'bordered' && 'border-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
