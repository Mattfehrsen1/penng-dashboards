import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import * as api from '@/lib/api/meal-plans';
import { MealPlan, MealPlanDay } from '@/types/meal-plan';
import { useToast } from '@/hooks/use-toast';

export function useMealPlans(trainerId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['meal-plans', trainerId],
    queryFn: () => api.getMealPlans(trainerId, session?.accessToken),
    enabled: !!trainerId && !!session?.accessToken,
  });
}

export function useMealPlan(id: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['meal-plan', id],
    queryFn: () => api.getMealPlan(id, session?.accessToken),
    enabled: !!id && !!session?.accessToken,
  });
}

export function useMealPlanDays(mealPlanId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['meal-plan-days', mealPlanId],
    queryFn: () => api.getMealPlanDays(mealPlanId, session?.accessToken),
    enabled: !!mealPlanId && !!session?.accessToken,
  });
}

export function useCreateMealPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<MealPlan>) => api.createMealPlan(data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      toast({
        title: 'Success',
        description: 'Meal plan created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateMealPlan(id: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<MealPlan>) => api.updateMealPlan(id, data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      queryClient.invalidateQueries({ queryKey: ['meal-plan', id] });
      toast({
        title: 'Success',
        description: 'Meal plan updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteMealPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (id: string) => api.deleteMealPlan(id, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans'] });
      toast({
        title: 'Success',
        description: 'Meal plan deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useCreateMealPlanDay() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<MealPlanDay>) => api.createMealPlanDay(data, session?.accessToken),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['meal-plan-days', variables.meal_plan_id]
      });
      toast({
        title: 'Success',
        description: 'Day added successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useAssignMealPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: any) => api.assignMealPlan(data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plan-assignments'] });
      toast({
        title: 'Success',
        description: 'Meal plan assigned to client',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
