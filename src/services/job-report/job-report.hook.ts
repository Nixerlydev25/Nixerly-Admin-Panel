import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import JobReportsService from './job-reports.service';
import { JobReportResponse, TJobReport } from '@/types/job-report.types';

export const useGetJobReports = ({
  page,
  limit,
  search,
  startDate,
  endDate,
}: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
} = {}) => {
  return useQuery<JobReportResponse>({
    queryKey: ['job-reports', { page, limit, search, startDate, endDate }],
    queryFn: () =>
      JobReportsService.getJobReports({ page, limit, search, startDate, endDate }),
  });
};

export const useGetJobReportById = (id: string) => {
  return useQuery<{ data: TJobReport; message: string }>({
    queryKey: ['job-report', id],
    queryFn: () => JobReportsService.getJobReportById(id),
  });
};

export const useToggleBlockJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => JobReportsService.toggleBlockJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['job-report'],
      });

      queryClient.invalidateQueries({
        queryKey: ['job-reports'],
      });
    },
  });
};
