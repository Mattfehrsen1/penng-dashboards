'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealPlanDaySchema, MealPlanDayFormData } from '@/lib/schemas/meal-plan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';

interface MealPlanDayEditorProps {
  dayNumber: number;
  onSave: (data: MealPlanDayFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function MealPlanDayEditor({
  dayNumber,
  onSave,
  onCancel,
  isLoading,
}: MealPlanDayEditorProps) {
  const form = useForm<MealPlanDayFormData>({
    resolver: zodResolver(mealPlanDaySchema),
    defaultValues: {
      day_number: dayNumber,
      meals: [
        {
          name: 'Breakfast',
          time: '8:00 AM',
          foods: [
            { name: '', quantity: '', calories: 0, protein: 0, carbs: 0, fat: 0 },
          ],
        },
      ],
    },
  });

  const { fields: meals, append: appendMeal, remove: removeMeal } = useFieldArray({
    control: form.control,
    name: 'meals',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Day {dayNumber}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {meals.map((meal, mealIdx) => (
              <div key={meal.id} className="space-y-4 border-l-2 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`meals.${mealIdx}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meal Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Breakfast" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`meals.${mealIdx}.time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 8:00 AM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <MealFoodsEditor mealIndex={mealIdx} form={form} />
                  </div>

                  {meals.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMeal(mealIdx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendMeal({
                  name: 'Meal',
                  time: '',
                  foods: [{ name: '', quantity: '', calories: 0, protein: 0, carbs: 0, fat: 0 }],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Day'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function MealFoodsEditor({ mealIndex, form }: { mealIndex: number; form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.foods`,
  });

  return (
    <div className="space-y-2">
      <FormLabel>Foods</FormLabel>
      {fields.map((food, foodIdx) => (
        <div key={food.id} className="grid gap-2 md:grid-cols-7">
          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.name`}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormControl>
                  <Input placeholder="Food name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Qty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.calories`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cal"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.protein`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Pro"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.carbs`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Carbs"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`meals.${mealIndex}.foods.${foodIdx}.fat`}
            render={({ field }) => (
              <FormItem className="flex items-start gap-2">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Fat"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(foodIdx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({ name: '', quantity: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Food
      </Button>
    </div>
  );
}
