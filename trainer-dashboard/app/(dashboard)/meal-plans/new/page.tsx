'use client';

import { useRouter } from 'next/navigation';
import MealPlanForm from '@/components/meal-plans/meal-plan-form';
import { useCreateMealPlan } from '@/hooks/use-meal-plans';
import { MealPlanFormData } from '@/lib/schemas/meal-plan';
import { useTrainerId } from '@/hooks/use-session-trainer';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewMealPlanPage() {
  const router = useRouter();
  const { trainerId, isLoading: isLoadingSession } = useTrainerId();
  const createMutation = useCreateMealPlan();

  const handleSubmit = async (data: MealPlanFormData) => {
    if (!trainerId) return;

    const result = await createMutation.mutateAsync({
      ...data,
      trainer_id: trainerId,
    });

    // Navigate to edit page to add days
    router.push(`/meal-plans/${result.id}/edit`);
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
        <h1 className="text-3xl font-bold tracking-tight">Create Meal Plan</h1>
        <p className="text-muted-foreground">
          Set the basic information for your meal plan
        </p>
      </div>

      <MealPlanForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
