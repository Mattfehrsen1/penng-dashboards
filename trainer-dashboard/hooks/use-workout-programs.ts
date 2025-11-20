import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import * as api from '@/lib/api/workout-programs';
import { WorkoutProgram, WorkoutDay } from '@/types/workout-program';
import { useToast } from '@/hooks/use-toast';

export function useWorkoutPrograms(trainerId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['workout-programs', trainerId],
    queryFn: () => api.getWorkoutPrograms(trainerId, session?.accessToken),
    enabled: !!trainerId && !!session?.accessToken,
  });
}

export function useWorkoutProgram(id: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['workout-program', id],
    queryFn: () => api.getWorkoutProgram(id, session?.accessToken),
    enabled: !!id && !!session?.accessToken,
  });
}

export function useWorkoutDays(programId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['workout-days', programId],
    queryFn: () => api.getWorkoutDays(programId, session?.accessToken),
    enabled: !!programId && !!session?.accessToken,
  });
}

export function useCreateWorkoutProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<WorkoutProgram>) => api.createWorkoutProgram(data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-programs'] });
      toast({
        title: 'Success',
        description: 'Workout program created successfully',
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

export function useUpdateWorkoutProgram(id: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<WorkoutProgram>) => api.updateWorkoutProgram(id, data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-programs'] });
      queryClient.invalidateQueries({ queryKey: ['workout-program', id] });
      toast({
        title: 'Success',
        description: 'Workout program updated successfully',
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

export function useDeleteWorkoutProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (id: string) => api.deleteWorkoutProgram(id, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-programs'] });
      toast({
        title: 'Success',
        description: 'Workout program deleted successfully',
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

export function useCreateWorkoutDay() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: Partial<WorkoutDay>) => api.createWorkoutDay(data, session?.accessToken),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['workout-days', variables.workout_program_id]
      });
      toast({
        title: 'Success',
        description: 'Workout day added successfully',
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

export function useAssignWorkoutProgram() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (data: any) => api.assignWorkoutProgram(data, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout-program-assignments'] });
      toast({
        title: 'Success',
        description: 'Workout program assigned to client',
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
