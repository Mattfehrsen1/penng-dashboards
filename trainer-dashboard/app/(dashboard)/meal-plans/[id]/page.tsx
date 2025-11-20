'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, UtensilsCrossed, Flame, Apple, Drumstick, Beef } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { ProgressRing } from '@/components/liquid-glass/progress-ring';

// Import mock data
import mealPlanDetails from '@/data/mock/meal-plan-details.json';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MealPlanDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  // Find the meal plan
  const mealPlan = mealPlanDetails.mealPlans.find((plan) => plan.id === id);

  if (!mealPlan) {
    return (
      <div className="p-6">
        <GlassCard className="p-12 text-center">
          <p className="dark:text-neutral-400 text-neutral-600">Meal plan not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </GlassCard>
      </div>
    );
  }

  const week = mealPlan.weeks[0]; // Show first week
  const dayToShow = week.days[0]; // Show first day for demo

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 animate-fade-in-up"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Meal Plans
      </Button>

      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-cobalt flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
                {mealPlan.name}
              </h1>
              <p className="dark:text-neutral-400 text-neutral-600 mt-2">
                {mealPlan.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Daily Calories"
          value={mealPlan.caloriesPerDay}
          icon={Flame}
          accentColor="amber"
          description="Target intake"
        />
        <MetricCard
          title="Protein"
          value={mealPlan.macros.protein}
          unit="g"
          icon={Drumstick}
          accentColor="cobalt"
          description="Per day"
        />
        <MetricCard
          title="Carbs"
          value={mealPlan.macros.carbs}
          unit="g"
          icon={Apple}
          accentColor="green"
          description="Per day"
        />
        <MetricCard
          title="Fats"
          value={mealPlan.macros.fats}
          unit="g"
          icon={Beef}
          accentColor="purple"
          description="Per day"
        />
      </div>

      {/* Macro Distribution */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-bold dark:text-white text-neutral-900 mb-6">Macro Distribution</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <ProgressRing
              progress={(mealPlan.macros.protein * 4 / mealPlan.caloriesPerDay) * 100}
              size={120}
              strokeWidth={8}
              showPercentage={true}
            />
            <p className="mt-4 font-bold dark:text-white text-neutral-900">Protein</p>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">{mealPlan.macros.protein}g ({Math.round((mealPlan.macros.protein * 4 / mealPlan.caloriesPerDay) * 100)}%)</p>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing
              progress={(mealPlan.macros.carbs * 4 / mealPlan.caloriesPerDay) * 100}
              size={120}
              strokeWidth={8}
              showPercentage={true}
            />
            <p className="mt-4 font-bold dark:text-white text-neutral-900">Carbs</p>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">{mealPlan.macros.carbs}g ({Math.round((mealPlan.macros.carbs * 4 / mealPlan.caloriesPerDay) * 100)}%)</p>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing
              progress={(mealPlan.macros.fats * 9 / mealPlan.caloriesPerDay) * 100}
              size={120}
              strokeWidth={8}
              showPercentage={true}
            />
            <p className="mt-4 font-bold dark:text-white text-neutral-900">Fats</p>
            <p className="text-sm dark:text-neutral-400 text-neutral-600">{mealPlan.macros.fats}g ({Math.round((mealPlan.macros.fats * 9 / mealPlan.caloriesPerDay) * 100)}%)</p>
          </div>
        </div>
      </GlassCard>

      {/* Sample Day */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold dark:text-white text-neutral-900">
            Sample Day - {dayToShow.day}
          </h2>
          <div className="text-sm dark:text-neutral-400 text-neutral-600">
            Total: {dayToShow.totalCalories} cal | P: {dayToShow.totalMacros.protein}g | C: {dayToShow.totalMacros.carbs}g | F: {dayToShow.totalMacros.fats}g
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {dayToShow.meals.map((meal, index) => (
            <GlassCard key={index} className="overflow-hidden hover:scale-[1.02] transition-transform">
              {/* Meal Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-penng-cobalt text-white capitalize">
                    {meal.type}
                  </span>
                </div>
              </div>

              {/* Meal Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3">
                  {meal.name}
                </h3>

                {/* Calories */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b dark:border-white/10 border-neutral-200">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-amber-500">{meal.calories}</span>
                  <span className="text-sm dark:text-neutral-400 text-neutral-600">calories</span>
                </div>

                {/* Macros Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Protein</p>
                    <p className="text-lg font-bold text-penng-cobalt">{meal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Carbs</p>
                    <p className="text-lg font-bold text-green-500">{meal.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs dark:text-neutral-400 text-neutral-600 mb-1">Fats</p>
                    <p className="text-lg font-bold text-purple-500">{meal.fats}g</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Week Overview */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold dark:text-white text-neutral-900 mb-4">
          Week {week.weekNumber} Overview
        </h2>
        <div className="space-y-3">
          {week.days.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg dark:bg-white/5 bg-white/60 hover:dark:bg-white/10 hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-cobalt flex items-center justify-center text-white font-bold">
                  {day.day.substring(0, 3)}
                </div>
                <div>
                  <p className="font-bold dark:text-white text-neutral-900">{day.day}</p>
                  <p className="text-sm dark:text-neutral-400 text-neutral-600">
                    {day.meals.length} meals planned
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-500">{day.totalCalories} cal</p>
                <p className="text-xs dark:text-neutral-400 text-neutral-600">
                  P:{day.totalMacros.protein}g • C:{day.totalMacros.carbs}g • F:{day.totalMacros.fats}g
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
