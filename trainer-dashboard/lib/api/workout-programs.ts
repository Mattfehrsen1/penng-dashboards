import { apiClient } from './client';
import { WorkoutProgram, WorkoutDay, WorkoutProgramAssignment } from '@/types/workout-program';

export async function getWorkoutPrograms(trainerId: string, accessToken?: string): Promise<WorkoutProgram[]> {
  return apiClient(`/api/v1/workout-programs?trainer_id=${trainerId}`, {}, accessToken);
}

export async function getWorkoutProgram(id: string, accessToken?: string): Promise<WorkoutProgram> {
  return apiClient(`/api/v1/workout-programs/${id}`, {}, accessToken);
}

export async function createWorkoutProgram(data: Partial<WorkoutProgram>, accessToken?: string): Promise<WorkoutProgram> {
  return apiClient('/api/v1/workout-programs', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function updateWorkoutProgram(id: string, data: Partial<WorkoutProgram>, accessToken?: string): Promise<WorkoutProgram> {
  return apiClient(`/api/v1/workout-programs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function deleteWorkoutProgram(id: string, accessToken?: string): Promise<void> {
  return apiClient(`/api/v1/workout-programs/${id}`, {
    method: 'DELETE',
  }, accessToken);
}

export async function getWorkoutDays(programId: string, accessToken?: string): Promise<WorkoutDay[]> {
  return apiClient(`/api/v1/workout-programs/${programId}/days`, {}, accessToken);
}

export async function createWorkoutDay(data: Partial<WorkoutDay>, accessToken?: string): Promise<WorkoutDay> {
  return apiClient('/api/v1/workout-programs/days', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}

export async function assignWorkoutProgram(data: Partial<WorkoutProgramAssignment>, accessToken?: string): Promise<WorkoutProgramAssignment> {
  return apiClient('/api/v1/workout-programs/assignments', {
    method: 'POST',
    body: JSON.stringify(data),
  }, accessToken);
}
