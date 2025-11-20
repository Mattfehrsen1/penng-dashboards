'use client';

import { useRouter } from 'next/navigation';
import WorkoutProgramForm from '@/components/workout-programs/workout-program-form';
import { useCreateWorkoutProgram } from '@/hooks/use-workout-programs';
import { WorkoutProgramFormData } from '@/lib/schemas/workout-program';
import { useTrainerId } from '@/hooks/use-session-trainer';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewWorkoutProgramPage() {
  const router = useRouter();
  const { trainerId, isLoading: isLoadingSession } = useTrainerId();
  const createMutation = useCreateWorkoutProgram();

  const handleSubmit = async (data: WorkoutProgramFormData) => {
    if (!trainerId) return;

    const result = await createMutation.mutateAsync({
      ...data,
      trainer_id: trainerId,
    });

    // Navigate to edit page to add workout days
    router.push(`/workout-programs/${result.id}/edit`);
  };

  // Show loading state while session is loading or trainer ID is not available
  if (isLoadingSession || !trainerId) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Workout Program</h1>
        <p className="text-muted-foreground">
          Set the basic information for your workout program
        </p>
      </div>

      <WorkoutProgramForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
