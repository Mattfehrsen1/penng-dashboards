'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';
import { Trophy, TrendingUp, Zap, Award, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import mock data
import clientsData from '@/data/mock/trainer-clients.json';
import progressData from '@/data/mock/client-progress.json';

export default function LeaderboardsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  // Get unique teams
  const teams = ['all', ...Array.from(new Set(clientsData.clients.map((c) => c.team)))];

  // Filter clients by team
  const filteredClients = selectedTeam === 'all'
    ? clientsData.clients
    : clientsData.clients.filter((c) => c.team === selectedTeam);

  // Sort by health score
  const leaderboardByHealth = [...filteredClients]
    .filter((c) => c.isActive)
    .sort((a, b) => b.healthScore - a.healthScore);

  // Sort by streak
  const leaderboardByStreak = [...filteredClients]
    .filter((c) => c.isActive)
    .sort((a, b) => b.currentStreak - a.currentStreak);

  // Sort by compliance
  const leaderboardByCompliance = [...filteredClients]
    .filter((c) => c.isActive)
    .sort((a, b) => b.compliance.overallScore - a.compliance.overallScore);

  // Team stats
  const teamStats = teams
    .filter((team) => team !== 'all')
    .map((team) => {
      const teamClients = clientsData.clients.filter((c) => c.team === team && c.isActive);
      const avgScore = teamClients.reduce((sum, c) => sum + c.healthScore, 0) / teamClients.length;
      const avgCompliance = teamClients.reduce((sum, c) => sum + c.compliance.overallScore, 0) / teamClients.length;
      return {
        team,
        avgScore: Math.round(avgScore),
        avgCompliance: Math.round(avgCompliance),
        memberCount: teamClients.length,
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  const topTeam = teamStats[0];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
          Leaderboards
        </h1>
        <p className="dark:text-neutral-400 text-neutral-600 mt-2">
          Track client and team performance rankings
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Top Performer"
          value={leaderboardByHealth[0]?.name.split(' ')[0] || 'N/A'}
          icon={Trophy}
          accentColor="cobalt"
          description={`Health Score: ${leaderboardByHealth[0]?.healthScore || 0}`}
        />

        <MetricCard
          title="Longest Streak"
          value={leaderboardByStreak[0]?.currentStreak || 0}
          unit="days"
          icon={Zap}
          accentColor="amber"
          description={leaderboardByStreak[0]?.name || 'N/A'}
        />

        <MetricCard
          title="Top Team"
          value={topTeam?.team || 'N/A'}
          icon={Users}
          accentColor="purple"
          description={`Avg Score: ${topTeam?.avgScore || 0}`}
        />

        <MetricCard
          title="Total Active Clients"
          value={filteredClients.filter((c) => c.isActive).length}
          icon={Award}
          accentColor="green"
          description={selectedTeam === 'all' ? 'All teams' : selectedTeam}
        />
      </div>

      {/* Team Filter */}
      <GlassCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 dark:text-neutral-400 text-neutral-600" />
          <span className="text-sm font-medium dark:text-neutral-400 text-neutral-600">Filter by Team:</span>
          <div className="flex gap-2 flex-wrap">
            {teams.map((team) => (
              <Button
                key={team}
                variant={selectedTeam === team ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTeam(team)}
                className={selectedTeam === team ? 'bg-penng-cobalt text-white' : ''}
              >
                {team === 'all' ? 'All Teams' : team}
              </Button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leaderboards - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Score Leaderboard */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Health Score Leaderboard</h3>
            </div>
            <div className="space-y-2">
              {leaderboardByHealth.slice(0, 10).map((client, index) => (
                <div
                  key={client.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    index < 3
                      ? 'dark:bg-gradient-to-r dark:from-penng-cobalt/10 dark:to-transparent bg-gradient-to-r from-penng-cobalt/5 to-transparent border-l-2 border-l-penng-cobalt'
                      : 'dark:bg-white/5 bg-white/60'
                  } hover:dark:bg-white/10 hover:bg-white/80`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-cobalt text-white font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    <div>
                      <p className="font-bold dark:text-white text-neutral-900">{client.name}</p>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600">{client.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-penng-cobalt">{client.healthScore}</p>
                    <p className="text-xs dark:text-neutral-400 text-neutral-600">Health Score</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Compliance Leaderboard */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Compliance Leaderboard</h3>
            </div>
            <div className="space-y-2">
              {leaderboardByCompliance.slice(0, 10).map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 rounded-lg dark:bg-white/5 bg-white/60 hover:dark:bg-white/10 hover:bg-white/80 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-bold dark:text-neutral-400 text-neutral-600">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium dark:text-white text-neutral-900">{client.name}</p>
                      <div className="flex gap-2 text-xs dark:text-neutral-400 text-neutral-600 mt-1">
                        <span>Workout: {client.compliance.workoutCompletion}%</span>
                        <span>•</span>
                        <span>Meal: {client.compliance.mealPlanAdherence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressRing
                      progress={client.compliance.overallScore}
                      size={50}
                      strokeWidth={4}
                      showPercentage={false}
                    />
                    <span className="text-xl font-bold text-green-500">{client.compliance.overallScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Streak Leaderboard */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold dark:text-white text-neutral-900">Current Streak Leaderboard</h3>
            </div>
            <div className="space-y-2">
              {leaderboardByStreak.slice(0, 10).map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 rounded-lg dark:bg-white/5 bg-white/60 hover:dark:bg-white/10 hover:bg-white/80 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-bold dark:text-neutral-400 text-neutral-600">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium dark:text-white text-neutral-900">{client.name}</p>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600">
                        Longest: {client.longestStreak} days
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-500">{client.currentStreak}</p>
                    <p className="text-xs dark:text-neutral-400 text-neutral-600">days</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Team Rankings Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Team Rankings */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-penng-cobalt" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Team Rankings</h3>
            </div>
            <div className="space-y-3">
              {teamStats.map((team, index) => (
                <div
                  key={team.team}
                  className={`p-4 rounded-lg ${
                    index === 0
                      ? 'dark:bg-gradient-to-r dark:from-penng-cobalt/20 dark:to-transparent bg-gradient-to-r from-penng-cobalt/10 to-transparent border-l-2 border-l-penng-cobalt'
                      : 'dark:bg-white/5 bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                      <span className="font-bold dark:text-white text-neutral-900">{team.team}</span>
                    </div>
                    <span className="text-xs dark:text-neutral-400 text-neutral-600">
                      {team.memberCount} members
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs dark:text-neutral-400 text-neutral-600">Avg Health Score</span>
                    <span className="font-bold text-penng-cobalt">{team.avgScore}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs dark:text-neutral-400 text-neutral-600">Avg Compliance</span>
                    <span className="font-bold text-green-500">{team.avgCompliance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Recent Achievements</h3>
            </div>
            <div className="space-y-3">
              {progressData.topPerformers.slice(0, 5).map((client) => (
                <div key={client.clientId} className="p-3 rounded-lg dark:bg-white/5 bg-white/60">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🎯</span>
                    <div className="flex-1">
                      <p className="font-medium dark:text-white text-neutral-900 text-sm">{client.name}</p>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600 mt-1">
                        {client.healthScoreIncrease > 0 && `+${client.healthScoreIncrease} health score • `}
                        {client.streakDays} day streak
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Leaderboard Stats */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Total Active</span>
                <span className="font-bold dark:text-white text-neutral-900">
                  {filteredClients.filter((c) => c.isActive).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Avg Health Score</span>
                <span className="font-bold text-penng-cobalt">
                  {Math.round(
                    filteredClients
                      .filter((c) => c.isActive)
                      .reduce((sum, c) => sum + c.healthScore, 0) /
                      filteredClients.filter((c) => c.isActive).length
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Avg Compliance</span>
                <span className="font-bold text-green-500">
                  {Math.round(
                    filteredClients
                      .filter((c) => c.isActive)
                      .reduce((sum, c) => sum + c.compliance.overallScore, 0) /
                      filteredClients.filter((c) => c.isActive).length
                  )}%
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
