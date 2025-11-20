'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { ThemeToggle } from '../theme-toggle';
import UserMenu from './user-menu';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen dark:bg-gradient-to-br dark:from-black dark:via-penng-charcoal dark:to-black bg-gradient-to-br from-penng-chalk via-white to-neutral-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 glass-card border-b dark:border-white/10 border-neutral-200">
          <div className="flex h-16 items-center px-6 justify-end gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
