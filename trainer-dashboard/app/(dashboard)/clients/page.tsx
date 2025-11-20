'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClients, useUpdateClientStatus, useDeleteClient } from '@/hooks/use-clients';
import { useTrainerId } from '@/hooks/use-session-trainer';
import { Client } from '@/types/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserPlus, Users, TrendingUp, Zap, Activity, Filter } from 'lucide-react';

// Import mock data
import clientsData from '@/data/mock/trainer-clients.json';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`px-2 py-1 text-xs font-bold rounded-full ${
        isActive
          ? 'bg-green-500/20 text-green-500 border border-green-500/30'
          : 'bg-neutral-500/20 text-neutral-500 border border-neutral-500/30'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

export default function ClientsPage() {
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockClients = clientsData.clients;

  // Get unique teams
  const teams = ['all', ...Array.from(new Set(mockClients.map((c) => c.team)))];

  // Filter clients
  const filteredClients = mockClients.filter((client) => {
    const matchesTeam = teamFilter === 'all' || client.team === teamFilter;
    const matchesSearch =
      searchTerm === '' ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const activeCount = mockClients.filter((c) => c.isActive).length;
  const avgHealthScore = Math.round(
    mockClients.filter((c) => c.isActive).reduce((sum, c) => sum + c.healthScore, 0) / activeCount
  );
  const avgCompliance = Math.round(
    mockClients.filter((c) => c.isActive).reduce((sum, c) => sum + c.compliance.overallScore, 0) / activeCount
  );
  const avgStreak = Math.round(
    mockClients.filter((c) => c.isActive).reduce((sum, c) => sum + c.currentStreak, 0) / activeCount
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
            Clients
          </h1>
          <p className="dark:text-neutral-400 text-neutral-600 mt-2">
            Manage and track your client roster
          </p>
        </div>
        <Button className="bg-penng-cobalt hover:bg-penng-cobalt/90 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Total Active Clients"
          value={activeCount}
          icon={Users}
          accentColor="cobalt"
          description={`${mockClients.length - activeCount} inactive`}
        />
        <MetricCard
          title="Avg Health Score"
          value={avgHealthScore}
          icon={Activity}
          accentColor="green"
          description="Across active clients"
        />
        <MetricCard
          title="Avg Compliance"
          value={avgCompliance}
          unit="%"
          icon={TrendingUp}
          accentColor="purple"
          description="Overall adherence"
        />
        <MetricCard
          title="Avg Streak"
          value={avgStreak}
          unit="days"
          icon={Zap}
          accentColor="amber"
          description="Current average"
        />
      </div>

      {/* Filters */}
      <GlassCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 dark:text-neutral-400 text-neutral-600" />
            <span className="text-sm font-medium dark:text-neutral-400 text-neutral-600">Team:</span>
            <div className="flex gap-2 flex-wrap">
              {teams.map((team) => (
                <Button
                  key={team}
                  variant={teamFilter === team ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTeamFilter(team)}
                  className={teamFilter === team ? 'bg-penng-cobalt text-white' : ''}
                >
                  {team === 'all' ? 'All Teams' : team}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Client Table */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold dark:text-white text-neutral-900 mb-2">Client Roster</h2>
          <p className="text-sm dark:text-neutral-400 text-neutral-600">
            Showing {filteredClients.length} of {mockClients.length} clients
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b dark:border-white/10 border-neutral-200">
                <TableHead className="dark:text-neutral-400 text-neutral-600">Name</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600">Team</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600">Health Score</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600">Compliance</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600">Streak</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600">Status</TableHead>
                <TableHead className="dark:text-neutral-400 text-neutral-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-b dark:border-white/10 border-neutral-200 hover:dark:bg-white/5 hover:bg-white/60 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium dark:text-white text-neutral-900">{client.name}</p>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600">{client.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-penng-cobalt/10 text-penng-cobalt border border-penng-cobalt/20">
                      {client.team}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ProgressRing progress={(client.healthScore / 100) * 100} size={32} strokeWidth={3} showPercentage={false} />
                      <span className="font-bold text-penng-cobalt">{client.healthScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${client.compliance.overallScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium dark:text-white text-neutral-900">
                        {client.compliance.overallScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="font-medium dark:text-white text-neutral-900">{client.currentStreak}</span>
                      <span className="text-xs dark:text-neutral-400 text-neutral-600">days</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge isActive={client.isActive} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassCard>
    </div>
  );
}
