import { useMutation, useQuery } from '@tanstack/react-query';
import BusinessService from '@/services/business/business.service';
import { BusinessListResponse } from '@/types/business';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { CustomAxiosError } from '../api';
import { queryClient } from '@/lib/react-query-provider';

export function usePaginatedBusiness({
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
  const { data, isFetching, error, refetch } = useQuery<BusinessListResponse>({
    queryKey: ['businesses', { page, search, status, country, limit }],
    queryFn: async () =>
      BusinessService.fetchBusinesses({
        pageParam: page,
        search,
        status,
        country,
        limit,
      }),
  });

  return { data, isFetching, error, refetch };
}

export function useBusinessById(id: string) {
  const { data, isFetching, error, refetch } = useQuery<BusinessListResponse>({
    queryKey: ['businesses', { id }],
    queryFn: async () => BusinessService.fetchBusinessById(id),
  });

  return { data, isFetching, error, refetch };
}

export function useBlockBusiness() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const toggleBlockMutation = useMutation({
    mutationFn: BusinessService.toggleBlockBusiness,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['businesses'],
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
