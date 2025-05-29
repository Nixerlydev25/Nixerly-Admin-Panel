import { useMutation, useQuery } from '@tanstack/react-query';
import WorkerService from '@/services/worker/worker.service';
import { WorkerListResponse } from '@/types/worker';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { CustomAxiosError } from '../api';
import { queryClient } from '@/lib/react-query-provider';

export function usePaginatedWorker({
  page,
  search,
  limit,
  status,
  country,
}: {
  page: number;
  search?: string;
  limit?: number;
  status?: string;
  country?: string;
}) {
  const { data, isFetching, error, refetch } = useQuery<WorkerListResponse>({
    queryKey: ['workers', { page, search, status, country, limit }],
    queryFn: async () =>
      WorkerService.fetchWorkers({
        pageParam: page,
        search,
        status,
        country,
        limit,
      }),
  });

  return { data, isFetching, error, refetch };
}

export function useWorkerById(workerId: string) {
  const { data, isFetching, error, refetch } = useQuery<WorkerListResponse>({
    queryKey: ['workers', { workerId }],
    queryFn: async () => WorkerService.getWorkerById(workerId),
  });
  return { data, isFetching, error, refetch };
}

export function useBlockWorker() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const toggleBlockMutation = useMutation({
    mutationFn: WorkerService.toggleBlockWorker,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['workers'],
      });
    },
    onError: (error: CustomAxiosError) => {
      setFormLoading(false);
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: 'destructive',
      });
    },
  });

  return {
    toggleBlockMutation,
    formStatus: {
      isFormLoading,
      setFormLoading,
    },
  };
}
