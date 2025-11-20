'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWorkoutProgram, useWorkoutDays, useCreateWorkoutDay } from '@/hooks/use-workout-programs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import WorkoutDayEditor from '@/components/workout-programs/workout-day-editor';
import { WorkoutDayFormData } from '@/lib/schemas/workout-program';

export default function EditWorkoutProgramPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;

  const { data: program, isLoading: programLoading } = useWorkoutProgram(programId);
  const { data: days, isLoading: daysLoading } = useWorkoutDays(programId);
  const createDay = useCreateWorkoutDay();

  const [editingWeek, setEditingWeek] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const handleAddDay = (week: number, day: number) => {
    setEditingWeek(week);
    setEditingDay(day);
  };

  const handleSaveDay = async (data: WorkoutDayFormData) => {
    await createDay.mutateAsync({
      workout_program_id: programId,
      ...data,
    });
    setEditingWeek(null);
    setEditingDay(null);
  };

  if (programLoading) {
    return <Skeleton className="h-96" />;
  }

  if (!program) {
    return <div>Workout program not found</div>;
  }

  // Organize days by week
  const daysByWeek = days?.reduce((acc, day) => {
    if (!acc[day.week_number]) {
      acc[day.week_number] = [];
    }
    acc[day.week_number].push(day);
    return acc;
  }, {} as Record<number, typeof days>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
          <p className="text-muted-foreground">
            Add workout days to your {program.duration_weeks}-week program
          </p>
        </div>
        <Button onClick={() => router.push('/workout-programs')}>
          Done
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
          <CardDescription>
            {program.difficulty} • {program.duration_weeks} weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {program.goals && program.goals.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">Goals:</span> {program.goals.join(', ')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Week by week breakdown */}
      {Array.from({ length: program.duration_weeks }, (_, i) => i + 1).map((week) => (
        <Card key={week}>
          <CardHeader>
            <CardTitle>Week {week}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {daysByWeek?.[week]?.map((day) => (
              <div key={day.id} className="border-l-2 pl-4">
                <h4 className="font-medium">Day {day.day_number}</h4>
                <div className="mt-2 space-y-2">
                  {day.exercises.map((exercise, idx) => (
                    <div key={idx} className="text-sm">
                      {exercise.name} - {exercise.sets}x{exercise.reps}
                      {exercise.rest_seconds > 0 && ` (${exercise.rest_seconds}s rest)`}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {editingWeek === week && editingDay ? (
              <WorkoutDayEditor
                weekNumber={week}
                dayNumber={editingDay}
                onSave={handleSaveDay}
                onCancel={() => {
                  setEditingWeek(null);
                  setEditingDay(null);
                }}
                isLoading={createDay.isPending}
              />
            ) : (
              <Button
                onClick={() => {
                  const nextDay = (daysByWeek?.[week]?.length || 0) + 1;
                  handleAddDay(week, nextDay);
                }}
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Day to Week {week}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
