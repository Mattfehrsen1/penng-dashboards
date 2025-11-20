'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workoutDaySchema, WorkoutDayFormData } from '@/lib/schemas/workout-program';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';

interface WorkoutDayEditorProps {
  weekNumber: number;
  dayNumber: number;
  onSave: (data: WorkoutDayFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function WorkoutDayEditor({
  weekNumber,
  dayNumber,
  onSave,
  onCancel,
  isLoading,
}: WorkoutDayEditorProps) {
  const form = useForm<WorkoutDayFormData>({
    resolver: zodResolver(workoutDaySchema),
    defaultValues: {
      week_number: weekNumber,
      day_number: dayNumber,
      exercises: [
        { name: '', sets: 3, reps: '10', rest_seconds: 60 },
      ],
    },
  });

  const { fields: exercises, append: appendExercise, remove: removeExercise } = useFieldArray({
    control: form.control,
    name: 'exercises',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Week {weekNumber}, Day {dayNumber}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercises.map((exercise, exerciseIdx) => (
              <div key={exercise.id} className="space-y-2 border-l-2 pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <FormField
                      control={form.control}
                      name={`exercises.${exerciseIdx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercise Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Barbell Bench Press" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-2 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name={`exercises.${exerciseIdx}.sets`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sets</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="3"
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
                        name={`exercises.${exerciseIdx}.reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reps</FormLabel>
                            <FormControl>
                              <Input placeholder="8-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`exercises.${exerciseIdx}.rest_seconds`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rest (seconds)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="60"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`exercises.${exerciseIdx}.notes`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any notes about this exercise..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(exerciseIdx)}
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
                appendExercise({ name: '', sets: 3, reps: '10', rest_seconds: 60 })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Workout'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
