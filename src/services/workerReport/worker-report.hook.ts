import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workerReportService from './worker-report.service';
import { WorkerReport, WorkerReportResponse } from '@/types/worker-report.types';

export const useGetWorkerReport = ({
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
}) => {
  return useQuery<WorkerReportResponse>({
    queryKey: ['workerReport', { page, search, limit, status, country }],
    queryFn: () =>
      workerReportService.fetchWorkers({
        pageParam: page,
        search,
        limit,
        status,
        country,
      }),
  });
};

export const useGetWorkerReportById = ({ workerId }: { workerId: string }) => {
  return useQuery<{ data: WorkerReport , message: string}>({
    queryKey: ['workerReportById', { workerId }],
    queryFn: () => workerReportService.getWorkerById(workerId),
  });
};

export const useToggleBlockWorker = () => {
  const queryClient = useQueryClient();
  return useMutation<WorkerReport, Error, { workerId: string }>({
    mutationFn: ({ workerId }: { workerId: string }) =>
      workerReportService.toggleBlockWorker(workerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workerReport'],
      });

      queryClient.invalidateQueries({
        queryKey: ['workerReportById'],
      });
    },
  });
};
