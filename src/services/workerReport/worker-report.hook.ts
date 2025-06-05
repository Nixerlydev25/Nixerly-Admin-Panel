import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workerReportService from './worker-report.service';
import { WorkerReport, WorkerReportResponse } from '@/types/worker-report.types';
import { WorkerReportDetailsResponse } from '@/types/worker-report-details.types';

interface FetchWorkersParams {
  pageParam?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export const useGetWorkerReport = ({
  page = 1,
  limit = 10,
  search,
  startDate,
  endDate,
}: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery<WorkerReportResponse>({
    queryKey: ['workerReport', { page, search, limit, startDate, endDate }],
    queryFn: () =>
      workerReportService.fetchWorkers({
        pageParam: page,
        limit,
        search,
        startDate,
        endDate,
      } as FetchWorkersParams),
  });
};

export const useGetWorkerReportById = ({ workerId }: { workerId: string }) => {
  return useQuery<WorkerReportDetailsResponse>({
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
