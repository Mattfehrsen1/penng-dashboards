import { z } from 'zod';

export const foodItemSchema = z.object({
  name: z.string().min(1, 'Food name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
});

export const mealSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  time: z.string().optional(),
  foods: z.array(foodItemSchema).min(1, 'At least one food item required'),
  notes: z.string().optional(),
});

export const mealPlanDaySchema = z.object({
  day_number: z.number().min(1).max(90),
  meals: z.array(mealSchema).min(1, 'At least one meal required'),
});

export const mealPlanSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().optional(),
  target_calories: z.number().min(800).max(5000),
  target_protein: z.number().min(0).optional(),
  target_carbs: z.number().min(0).optional(),
  target_fat: z.number().min(0).optional(),
  duration_days: z.number().min(1).max(90),
  is_template: z.boolean(),
});

export type MealPlanFormData = z.infer<typeof mealPlanSchema>;
export type MealPlanDayFormData = z.infer<typeof mealPlanDaySchema>;
export type FoodItemFormData = z.infer<typeof foodItemSchema>;
export type MealFormData = z.infer<typeof mealSchema>;
