import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import * as api from '@/lib/api/clients';
import { useToast } from '@/hooks/use-toast';

export function useClients(trainerId: string, statusFilter: string = 'active') {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['clients', trainerId, statusFilter],
    queryFn: () => api.getClients(trainerId, statusFilter, session?.accessToken),
    enabled: !!trainerId && !!session?.accessToken,
  });
}

export function useClient(clientId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['client', clientId],
    queryFn: () => api.getClient(clientId, session?.accessToken),
    enabled: !!clientId && !!session?.accessToken,
  });
}

export function useUpdateClientStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: ({ clientId, status }: { clientId: string; status: 'active' | 'paused' | 'cancelled' }) =>
      api.updateClientStatus(clientId, status, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Success',
        description: 'Client status updated successfully',
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

export function useDeleteClient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useMutation({
    mutationFn: (clientId: string) => api.deleteClient(clientId, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Success',
        description: 'Client removed successfully',
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

export function useClientOnboarding(userId: string) {
  const session = { user: { trainerId: "demo-trainer-123" }, accessToken: "demo-token" };

  return useQuery({
    queryKey: ['client-onboarding', userId],
    queryFn: () => api.getClientOnboarding(userId, session?.accessToken),
    enabled: !!userId && !!session?.accessToken,
  });
}
