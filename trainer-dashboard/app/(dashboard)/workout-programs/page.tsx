'use client';

import { useRouter } from 'next/navigation';
import { Plus, Dumbbell, Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { useWorkoutPrograms, useDeleteWorkoutProgram } from '@/hooks/use-workout-programs';
import WorkoutProgramCard from '@/components/workout-programs/workout-program-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrainerId } from '@/hooks/use-session-trainer';

// Import mock data
import programsData from '@/data/mock/programs.json';

export default function WorkoutProgramsPage() {
  const router = useRouter();
  const { trainerId, isLoading: isLoadingSession } = useTrainerId();
  const { data: programs, isLoading } = useWorkoutPrograms(trainerId || '');
  const deleteMutation = useDeleteWorkoutProgram();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this workout program?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const mockPrograms = programsData.workoutPrograms;
  const totalAssigned = mockPrograms.reduce((sum, p) => sum + p.assignedClients, 0);
  const avgCompletion = Math.round(
    mockPrograms.reduce((sum, p) => sum + p.avgCompletionRate, 0) / mockPrograms.length
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
            Workout Programs
          </h1>
          <p className="dark:text-neutral-400 text-neutral-600 mt-2">
            Create and manage workout programs for your clients
          </p>
        </div>
        <Button
          onClick={() => router.push('/workout-programs/new')}
          className="bg-penng-cobalt hover:bg-penng-cobalt/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Total Programs"
          value={programsData.programStats.totalWorkoutPrograms}
          icon={Dumbbell}
          accentColor="cobalt"
          description="Active workout programs"
        />
        <MetricCard
          title="Clients Assigned"
          value={totalAssigned}
          icon={Users}
          accentColor="purple"
          description="Total program assignments"
        />
        <MetricCard
          title="Avg Completion Rate"
          value={avgCompletion}
          unit="%"
          icon={TrendingUp}
          accentColor="green"
          trend={{
            value: 5,
            label: 'vs last month',
            isPositive: true,
          }}
          description="Program adherence"
        />
        <MetricCard
          title="Most Popular"
          value={mockPrograms.find(p => p.id === programsData.programStats.mostPopularWorkout)?.name.split(' ')[0] || 'N/A'}
          icon={Clock}
          accentColor="amber"
          description="Top program"
        />
      </div>

      {/* Mock Programs */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-bold dark:text-white text-neutral-900">Available Programs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockPrograms.map((program) => (
            <GlassCard key={program.id} className="p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-1">{program.name}</h3>
                  <p className="text-sm dark:text-neutral-400 text-neutral-600">{program.description}</p>
                </div>
                <Dumbbell className="w-6 h-6 text-penng-cobalt" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Type:</span>
                  <span className="font-medium dark:text-white text-neutral-900 capitalize">{program.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Duration:</span>
                  <span className="font-medium dark:text-white text-neutral-900">{program.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Difficulty:</span>
                  <span className={`font-medium capitalize ${
                    program.difficulty === 'beginner' ? 'text-green-500' :
                    program.difficulty === 'intermediate' ? 'text-amber-500' : 'text-red-500'
                  }`}>{program.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Assigned to:</span>
                  <span className="font-medium text-penng-cobalt">{program.assignedClients} clients</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t dark:border-white/10 border-neutral-200">
                  <span className="dark:text-neutral-400 text-neutral-600">Completion Rate:</span>
                  <span className="font-bold text-green-500">{program.avgCompletionRate}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-white/10 border-neutral-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/workout-programs/${program.id}`)}
                >
                  View Details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* User's Custom Programs (from API) */}
      {programs && programs.length > 0 && (
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold dark:text-white text-neutral-900">Your Custom Programs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <WorkoutProgramCard
                key={program.id}
                program={program}
                onDelete={() => handleDelete(program.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
