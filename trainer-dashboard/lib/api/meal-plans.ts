import { apiClient } from './client';
import { MealPlan, MealPlanDay, MealPlanAssignment } from '@/types/meal-plan';

export async function getMealPlans(trainerId: string, accessToken?: string): Promise<MealPlan[]> {
  return apiClient(`/api/v1/meal-plans?trainer_id=${trainerId}`, {}, accessToken);
}

export async function getMealPlan(id: string, accessToken?: string): Promise<MealPlan> {
  return apiClient(`/api/v1/meal-plans/${id}`, {}, accessToken);
}

export async function createMealPlan(data: Partial<MealPlan>, accessToken?: string): Promise<MealPlan> {
  return apiClient('/api/v1/meal-plans', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function updateMealPlan(id: string, data: Partial<MealPlan>, accessToken?: string): Promise<MealPlan> {
  return apiClient(`/api/v1/meal-plans/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function deleteMealPlan(id: string, accessToken?: string): Promise<void> {
  return apiClient(`/api/v1/meal-plans/${id}`, {
    method: 'DELETE',
  }, accessToken);
}

export async function getMealPlanDays(mealPlanId: string, accessToken?: string): Promise<MealPlanDay[]> {
  return apiClient(`/api/v1/meal-plans/${mealPlanId}/days`, {}, accessToken);
}

export async function createMealPlanDay(data: Partial<MealPlanDay>, accessToken?: string): Promise<MealPlanDay> {
  return apiClient('/api/v1/meal-plans/days', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function assignMealPlan(data: Partial<MealPlanAssignment>, accessToken?: string): Promise<MealPlanAssignment> {
  return apiClient('/api/v1/meal-plans/assignments', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}
