'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/client-progress', label: 'Client Progress' },
  { href: '/leaderboards', label: 'Leaderboards' },
  { href: '/messages', label: 'Messages' },
  { href: '/clients', label: 'Clients' },
  { href: '/meal-plans', label: 'Meal Plans' },
  { href: '/workout-programs', label: 'Workout Programs' },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
