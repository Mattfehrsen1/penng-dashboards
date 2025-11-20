'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMealPlan, useMealPlanDays, useCreateMealPlanDay } from '@/hooks/use-meal-plans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import MealPlanDayEditor from '@/components/meal-plans/meal-plan-day-editor';
import { MealPlanDayFormData } from '@/lib/schemas/meal-plan';

export default function EditMealPlanPage() {
  const params = useParams();
  const router = useRouter();
  const mealPlanId = params.id as string;

  const { data: mealPlan, isLoading: planLoading } = useMealPlan(mealPlanId);
  const { data: days, isLoading: daysLoading } = useMealPlanDays(mealPlanId);
  const createDay = useCreateMealPlanDay();

  const [editingDay, setEditingDay] = useState<number | null>(null);

  const handleAddDay = () => {
    const nextDay = (days?.length || 0) + 1;
    setEditingDay(nextDay);
  };

  const handleSaveDay = async (data: MealPlanDayFormData) => {
    await createDay.mutateAsync({
      meal_plan_id: mealPlanId,
      ...data,
    });
    setEditingDay(null);
  };

  const calculateDayMacros = (day: any) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    day.meals.forEach((meal: any) => {
      meal.foods.forEach((food: any) => {
        totalCalories += food.calories;
        totalProtein += food.protein;
        totalCarbs += food.carbs;
        totalFat += food.fat;
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };

  if (planLoading) {
    return <Skeleton className="h-96" />;
  }

  if (!mealPlan) {
    return <div>Meal plan not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{mealPlan.name}</h1>
          <p className="text-muted-foreground">
            Add daily meal structures to your plan
          </p>
        </div>
        <Button onClick={() => router.push('/meal-plans')}>
          Done
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Overview</CardTitle>
          <CardDescription>
            Target: {mealPlan.target_calories} calories • {mealPlan.duration_days} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            {mealPlan.target_protein && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Protein:</span>
                <span>{mealPlan.target_protein}g</span>
              </div>
            )}
            {mealPlan.target_carbs && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carbs:</span>
                <span>{mealPlan.target_carbs}g</span>
              </div>
            )}
            {mealPlan.target_fat && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fat:</span>
                <span>{mealPlan.target_fat}g</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {daysLoading ? (
          <Skeleton className="h-48" />
        ) : days && days.length > 0 ? (
          days.map((day) => {
            const macros = calculateDayMacros(day);
            return (
              <Card key={day.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Day {day.day_number}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {macros.totalCalories} cal • {macros.totalProtein}g protein
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.meals.map((meal, idx) => (
                      <div key={idx} className="border-l-2 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{meal.name}</h4>
                          {meal.time && (
                            <span className="text-sm text-muted-foreground">{meal.time}</span>
                          )}
                        </div>
                        <div className="mt-2 space-y-1">
                          {meal.foods.map((food, foodIdx) => (
                            <div key={foodIdx} className="text-sm grid grid-cols-2 gap-2">
                              <span>{food.name} - {food.quantity}</span>
                              <span className="text-muted-foreground text-right">
                                {food.calories} cal • {food.protein}g P • {food.carbs}g C • {food.fat}g F
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No days added yet</p>
            </CardContent>
          </Card>
        )}

        {editingDay ? (
          <MealPlanDayEditor
            dayNumber={editingDay}
            onSave={handleSaveDay}
            onCancel={() => setEditingDay(null)}
            isLoading={createDay.isPending}
          />
        ) : (
          <Button onClick={handleAddDay} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Day {(days?.length || 0) + 1}
          </Button>
        )}
      </div>
    </div>
  );
}
