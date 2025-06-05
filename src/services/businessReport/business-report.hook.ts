import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BusinessReportService from './business-report.service';
import {
  BusinessReport,
  BusinessReportResponse,
} from '@/types/business-report.type';

export const useFetchBusinessReports = ({
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
  return useQuery<BusinessReportResponse>({
    queryKey: ['businessReports', { page, limit, search, startDate, endDate }],
    queryFn: () =>
      BusinessReportService.fetchBusinessReports({
        pageParam: page,
        search,
        limit,
        startDate,
        endDate,
      }),
  });
};

export const useGetBusinessReportById = ({
  businessId,
}: {
  businessId: string;
}) => {
  return useQuery<{ data: BusinessReport; message: string }>({
    queryKey: ['businessReportById', { businessId }],
    queryFn: () => BusinessReportService.getBusinessById(businessId),
  });
};

export const useToggleBlockBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ businessId }: { businessId: string }) =>
      BusinessReportService.toggleBlockBusiness(businessId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['businessReports'],
      });

      queryClient.invalidateQueries({
        queryKey: ['businessReportById'],
      });
    },
  });
};
