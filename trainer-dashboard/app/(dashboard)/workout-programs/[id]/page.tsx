'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Dumbbell, Clock, Target, Zap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';

// Import mock data
import workoutProgramDetails from '@/data/mock/workout-program-details.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutProgramDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  // Find the workout program
  const program = workoutProgramDetails.workoutPrograms.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="p-6">
        <GlassCard className="p-12 text-center">
          <p className="dark:text-neutral-400 text-neutral-600">Workout program not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </GlassCard>
      </div>
    );
  }

  const currentWeek = program.weeks[selectedWeek];
  const currentDay = currentWeek.days[selectedDay];

  const totalExercises = currentWeek.days.reduce((sum, day) => sum + day.exercises.length, 0);
  const totalDuration = currentWeek.days.reduce((sum, day) => sum + day.duration, 0);
  const workoutsPerWeek = currentWeek.days.length;

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 animate-fade-in-up"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Workout Programs
      </Button>

      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-cobalt flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
                {program.name}
              </h1>
              <p className="dark:text-neutral-400 text-neutral-600 mt-2">
                {program.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  program.difficulty === 'beginner' ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                  program.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                  'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}>
                  {program.difficulty.toUpperCase()}
                </span>
                <span className="text-sm dark:text-neutral-400 text-neutral-600">
                  {program.duration} • {program.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Program Duration"
          value={program.duration.split(' ')[0]}
          unit="weeks"
          icon={Calendar}
          accentColor="cobalt"
          description="Total program length"
        />
        <MetricCard
          title="Weekly Workouts"
          value={workoutsPerWeek}
          icon={Dumbbell}
          accentColor="purple"
          description="Training days per week"
        />
        <MetricCard
          title="Weekly Volume"
          value={totalDuration}
          unit="min"
          icon={Clock}
          accentColor="amber"
          description="Total training time"
        />
        <MetricCard
          title="Exercises"
          value={totalExercises}
          icon={Target}
          accentColor="green"
          description="Total this week"
        />
      </div>

      {/* Week Selector */}
      <GlassCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-5 h-5 dark:text-neutral-400 text-neutral-600" />
          <span className="text-sm font-medium dark:text-neutral-400 text-neutral-600 mr-2">Select Week:</span>
          <div className="flex gap-2 flex-wrap">
            {program.weeks.map((week, index) => (
              <Button
                key={index}
                variant={selectedWeek === index ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setSelectedWeek(index);
                  setSelectedDay(0);
                }}
                className={selectedWeek === index ? 'bg-penng-cobalt text-white' : ''}
              >
                Week {week.weekNumber}
              </Button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Week Overview */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold dark:text-white text-neutral-900">
            Week {currentWeek.weekNumber} Overview
          </h2>
          <p className="text-sm dark:text-neutral-400 text-neutral-600 mt-1">
            Focus: {currentWeek.focus}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentWeek.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedDay === index
                  ? 'dark:bg-penng-cobalt/20 bg-penng-cobalt/10 border-2 border-penng-cobalt'
                  : 'dark:bg-white/5 bg-white/60 border-2 border-transparent hover:dark:bg-white/10 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold dark:text-white text-neutral-900">{day.day}</h3>
                <Clock className="w-4 h-4 dark:text-neutral-400 text-neutral-600" />
              </div>
              <p className="text-sm dark:text-neutral-400 text-neutral-600 mb-1">
                {day.muscleGroup}
              </p>
              <div className="flex items-center gap-4 text-xs dark:text-neutral-500 text-neutral-500">
                <span>{day.duration} min</span>
                <span>•</span>
                <span>{day.exercises.length} exercises</span>
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Workout Details */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold dark:text-white text-neutral-900">
              {currentDay.day} - {currentDay.muscleGroup}
            </h2>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">
              {currentDay.duration} minutes • {currentDay.exercises.length} exercises
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {currentDay.exercises.map((exercise, index) => (
            <GlassCard key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Exercise Image */}
                <div className="relative h-48 md:h-auto overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-penng-cobalt text-white">
                      Exercise {index + 1}
                    </span>
                  </div>
                </div>

                {/* Exercise Details */}
                <div className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-bold dark:text-white text-neutral-900 mb-4">
                    {exercise.name}
                  </h3>

                  {/* Sets, Reps, Rest Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b dark:border-white/10 border-neutral-200">
                    <div>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Sets</p>
                      <p className="text-xl font-bold text-penng-cobalt">{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Reps</p>
                      <p className="text-xl font-bold text-green-500">{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Rest</p>
                      <p className="text-xl font-bold text-amber-500">{exercise.rest}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex items-start gap-2 p-3 rounded-lg dark:bg-white/5 bg-white/60">
                    <Zap className="w-5 h-5 text-penng-cobalt mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold dark:text-neutral-400 text-neutral-600 mb-1">
                        TRAINING TIPS
                      </p>
                      <p className="text-sm dark:text-white text-neutral-900">
                        {exercise.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Program Summary */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-bold dark:text-white text-neutral-900 mb-4">
          Full Week Schedule
        </h2>
        <div className="space-y-2">
          {currentWeek.days.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg dark:bg-white/5 bg-white/60"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-cobalt flex items-center justify-center text-white font-bold">
                  {day.day.substring(0, 3)}
                </div>
                <div>
                  <p className="font-bold dark:text-white text-neutral-900">{day.muscleGroup}</p>
                  <p className="text-sm dark:text-neutral-400 text-neutral-600">
                    {day.exercises.length} exercises
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-penng-cobalt">{day.duration} min</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
