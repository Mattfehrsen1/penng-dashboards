'use client';

import { useRouter } from 'next/navigation';
import { Plus, UtensilsCrossed, Users, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { useMealPlans, useDeleteMealPlan } from '@/hooks/use-meal-plans';
import MealPlanCard from '@/components/meal-plans/meal-plan-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrainerId } from '@/hooks/use-session-trainer';

// Import mock data
import programsData from '@/data/mock/programs.json';

export default function MealPlansPage() {
  const router = useRouter();
  const { trainerId, isLoading: isLoadingSession } = useTrainerId();
  const { data: mealPlans, isLoading } = useMealPlans(trainerId || '');
  const deleteMutation = useDeleteMealPlan();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this meal plan?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const mockMealPlans = programsData.mealPlans;
  const totalAssigned = mockMealPlans.reduce((sum, p) => sum + p.assignedClients, 0);
  const avgAdherence = Math.round(
    mockMealPlans.reduce((sum, p) => sum + p.avgAdherence, 0) / mockMealPlans.length
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
            Meal Plans
          </h1>
          <p className="dark:text-neutral-400 text-neutral-600 mt-2">
            Create and manage meal plans for your clients
          </p>
        </div>
        <Button
          onClick={() => router.push('/meal-plans/new')}
          className="bg-penng-cobalt hover:bg-penng-cobalt/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Meal Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Total Meal Plans"
          value={programsData.programStats.totalMealPlans}
          icon={UtensilsCrossed}
          accentColor="cobalt"
          description="Active meal plans"
        />
        <MetricCard
          title="Clients Assigned"
          value={totalAssigned}
          icon={Users}
          accentColor="purple"
          description="Total plan assignments"
        />
        <MetricCard
          title="Avg Adherence Rate"
          value={avgAdherence}
          unit="%"
          icon={TrendingUp}
          accentColor="green"
          trend={{
            value: 8,
            label: 'vs last month',
            isPositive: true,
          }}
          description="Plan compliance"
        />
        <MetricCard
          title="Most Popular"
          value={mockMealPlans.find(p => p.id === programsData.programStats.mostPopularMeal)?.name.split(' ')[0] || 'N/A'}
          icon={Target}
          accentColor="amber"
          description="Top meal plan"
        />
      </div>

      {/* Mock Meal Plans */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-bold dark:text-white text-neutral-900">Available Meal Plans</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockMealPlans.map((plan) => (
            <GlassCard key={plan.id} className="p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm dark:text-neutral-400 text-neutral-600">{plan.description}</p>
                </div>
                <UtensilsCrossed className="w-6 h-6 text-penng-cobalt" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Type:</span>
                  <span className="font-medium dark:text-white text-neutral-900 capitalize">{plan.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Calories/day:</span>
                  <span className="font-medium dark:text-white text-neutral-900">{plan.dailyCalories}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Macros:</span>
                  <span className="font-medium dark:text-white text-neutral-900 text-xs">
                    P: {plan.macros.protein}g • C: {plan.macros.carbs}g • F: {plan.macros.fats}g
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-neutral-400 text-neutral-600">Assigned to:</span>
                  <span className="font-medium text-penng-cobalt">{plan.assignedClients} clients</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t dark:border-white/10 border-neutral-200">
                  <span className="dark:text-neutral-400 text-neutral-600">Adherence Rate:</span>
                  <span className="font-bold text-green-500">{plan.avgAdherence}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-white/10 border-neutral-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/meal-plans/${plan.id}`)}
                >
                  View Details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* User's Custom Meal Plans (from API) */}
      {mealPlans && mealPlans.length > 0 && (
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold dark:text-white text-neutral-900">Your Custom Meal Plans</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mealPlans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                plan={plan}
                onDelete={() => handleDelete(plan.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
