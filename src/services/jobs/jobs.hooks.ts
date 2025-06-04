import { useMutation, useQuery } from '@tanstack/react-query';
import JobsService from '@/services/jobs/jobs.service';
import { JobListResponse, TJob } from '@/types/jobs';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { CustomAxiosError } from '../api';
import { queryClient } from '@/lib/react-query-provider';

export function usePaginatedJobs({
  page,
  search,
  limit,
  status,
  employmentType,
  jobType,
}: {
  page: number;
  search?: string;
  limit?: number;
  status?: string;
  employmentType?: string;
  jobType?: string;
}) {
  const { data, isFetching, error, refetch } = useQuery<JobListResponse>({
    queryKey: [
      'jobs',
      { page, search, status, employmentType, jobType, limit },
    ],
    queryFn: async () =>
      JobsService.fetchJobs({
        pageParam: page,
        search,
        status,
        employmentType,
        jobType,
        limit,
      }),
  });

  return { data, isFetching, error, refetch };
}

export function useJobById(jobId: string) {
  const { data, isFetching, error, refetch } = useQuery<{
    message: string;
    job: TJob;
  }>({
    queryKey: ['jobs', { jobId }],
    queryFn: async () => JobsService.getJobById(jobId),
  });

  return { data, isFetching, error, refetch };
}

export function useJobApplications(jobId: string) {
  const { data, isFetching, error, refetch } = useQuery<JobListResponse>({
    queryKey: ['jobs', { jobId }],
    queryFn: async () => JobsService.getJobApplications(jobId),
  });
  return { data, isFetching, error, refetch };
}

export function useBlockJob() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const toggleBlockMutation = useMutation({
    mutationFn: JobsService.toggleBlockJob,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
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
