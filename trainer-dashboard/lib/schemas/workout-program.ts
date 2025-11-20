import { z } from 'zod';

export const exerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.number().min(1).max(10),
  reps: z.string().min(1, 'Reps are required'),
  rest_seconds: z.number().min(0).max(600),
  notes: z.string().optional(),
});

export const workoutDaySchema = z.object({
  week_number: z.number().min(1).max(52),
  day_number: z.number().min(1).max(7),
  exercises: z.array(exerciseSchema).min(1, 'At least one exercise required'),
});

export const workoutProgramSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  duration_weeks: z.number().min(1).max(52),
  goals: z.array(z.string()).optional(),
  equipment_needed: z.array(z.string()).optional(),
  is_template: z.boolean(),
});

export type WorkoutProgramFormData = z.infer<typeof workoutProgramSchema>;
export type WorkoutDayFormData = z.infer<typeof workoutDaySchema>;
export type ExerciseFormData = z.infer<typeof exerciseSchema>;
