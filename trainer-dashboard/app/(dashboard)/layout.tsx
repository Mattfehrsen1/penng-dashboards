import DashboardLayoutClient from '@/components/layout/dashboard-layout-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth disabled for now - direct access to dashboard
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
