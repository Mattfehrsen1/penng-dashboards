import { apiClient } from './client';
import { Client, ClientOnboarding } from '@/types/client';

export async function getClients(trainerId: string, statusFilter: string = 'active', accessToken?: string): Promise<Client[]> {
  return apiClient(`/api/v1/clients?trainer_id=${trainerId}&status_filter=${statusFilter}`, {}, accessToken);
}

export async function getClient(clientId: string, accessToken?: string): Promise<Client> {
  return apiClient(`/api/v1/clients/${clientId}`, {}, accessToken);
}

export async function updateClientStatus(clientId: string, status: 'active' | 'paused' | 'cancelled', accessToken?: string): Promise<Client> {
  return apiClient(`/api/v1/clients/${clientId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }, accessToken);
}

export async function deleteClient(clientId: string, accessToken?: string): Promise<void> {
  return apiClient(`/api/v1/clients/${clientId}`, {
    method: 'DELETE',
  }, accessToken);
}

export async function getClientOnboarding(userId: string, accessToken?: string): Promise<ClientOnboarding> {
  return apiClient(`/api/v1/clients/onboarding/${userId}`, {}, accessToken);
}
