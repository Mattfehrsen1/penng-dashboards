'use client';

import { GlassCard } from '@/components/liquid-glass/glass-card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Users, Calendar, TrendingUp } from 'lucide-react';

export default function ChallengesPage() {
  const challenges = [
    {
      id: 1,
      name: 'November Step Challenge',
      type: 'steps',
      participants: 42,
      goal: '10,000 steps daily',
      progress: 68,
      daysLeft: 13,
      status: 'active',
      icon: '👟',
    },
    {
      id: 2,
      name: 'Sleep Champion',
      type: 'sleep',
      participants: 28,
      goal: '7+ hrs for 5 nights',
      progress: 45,
      daysLeft: 3,
      status: 'active',
      icon: '😴',
    },
    {
      id: 3,
      name: 'Workout Warriors',
      type: 'workouts',
      participants: 35,
      goal: '12 workouts in 3 weeks',
      progress: 58,
      daysLeft: 7,
      status: 'active',
      icon: '💪',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', dept: 'Sales', score: 52300, avatar: '👩' },
    { rank: 2, name: 'Marcus Chen', dept: 'Creative', score: 49800, avatar: '👨' },
    { rank: 3, name: 'Emily Rodriguez', dept: 'Production', score: 48700, avatar: '👩' },
    { rank: 4, name: 'David Park', dept: 'Sales', score: 46200, avatar: '👨' },
    { rank: 5, name: 'Lisa Anderson', dept: 'Creative', score: 45100, avatar: '👩' },
    { rank: 6, name: 'James Wilson', dept: 'Production', score: 43800, avatar: '👨' },
    { rank: 7, name: 'Anna Martinez', dept: 'Admin', score: 42500, avatar: '👩' },
    { rank: 8, name: 'Tom Brown', dept: 'Creative', score: 41200, avatar: '👨' },
  ];

  const getRankMedal = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (rank === 2) return { icon: '🥈', color: 'text-gray-300', bg: 'bg-gray-500/20' };
    if (rank === 3) return { icon: '🥉', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { icon: `#${rank}`, color: 'text-neutral-400', bg: 'bg-white/5' };
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Challenges & Competitions</h1>
          <p className="text-neutral-400">
            Active wellness challenges and employee leaderboards
          </p>
        </div>
        <Button variant="gradient">
          Create Challenge
        </Button>
      </div>

      {/* Active Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <GlassCard key={challenge.id} variant="hover" className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{challenge.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
                  <p className="text-xs text-neutral-400">{challenge.goal}</p>
                </div>
              </div>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Participants</span>
                <span className="text-white font-semibold">{challenge.participants}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Days Left</span>
                <span className="text-white font-semibold">{challenge.daysLeft}</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-400">Progress</span>
                  <span className="text-white font-semibold">{challenge.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-penng-cobalt h-2 rounded-full transition-all duration-500"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                View Details
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Leaderboard */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              November Step Challenge Leaderboard
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-2">
            {leaderboard.map((person) => {
              const medal = getRankMedal(person.rank);
              return (
                <div
                  key={person.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:border-penng-cobalt/30 ${
                    person.rank <= 3
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-lg ${medal.bg} flex items-center justify-center`}
                    >
                      <span className={`font-bold ${medal.color}`}>{medal.icon}</span>
                    </div>

                    {/* Avatar & Info */}
                    <span className="text-3xl">{person.avatar}</span>
                    <div>
                      <p className="text-white font-semibold">{person.name}</p>
                      <p className="text-xs text-neutral-400">{person.dept}</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      {person.score.toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-400">steps</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Challenge Stats */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Challenge Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-penng-cobalt" />
                  <span className="text-neutral-400 text-sm">Total Participants</span>
                </div>
                <span className="text-white font-bold">42</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-neutral-400 text-sm">Avg Daily Steps</span>
                </div>
                <span className="text-white font-bold">11,234</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="text-neutral-400 text-sm">Goal Achievers</span>
                </div>
                <span className="text-white font-bold">29</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-neutral-400 text-sm">Days Active</span>
                </div>
                <span className="text-white font-bold">17/30</span>
              </div>
            </div>
          </GlassCard>

          {/* Department Leaders */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Department Leaders</h3>
            <div className="space-y-3">
              {[
                { dept: 'Sales', leader: 'Sarah J.', avg: 11800, color: 'bg-penng-cobalt' },
                { dept: 'Creative', leader: 'Marcus C.', avg: 11200, color: 'bg-green-500' },
                { dept: 'Production', leader: 'Emily R.', avg: 10600, color: 'bg-purple-500' },
                { dept: 'Admin', leader: 'Anna M.', avg: 9800, color: 'bg-orange-500' },
              ].map((item) => (
                <div key={item.dept} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">{item.dept}</span>
                    <span className="text-neutral-400">{item.avg.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className={`${item.color} h-1.5 rounded-full`}
                      style={{ width: `${(item.avg / 12000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-500">Led by {item.leader}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Rewards */}
          <GlassCard className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Medal className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-white">Rewards</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">1st Place</span>
                <span className="text-amber-400 font-semibold">$100 Gift Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">2nd Place</span>
                <span className="text-gray-300 font-semibold">$75 Gift Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">3rd Place</span>
                <span className="text-orange-300 font-semibold">$50 Gift Card</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-neutral-300">All Finishers</span>
                <span className="text-green-400 font-semibold">Badge</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
