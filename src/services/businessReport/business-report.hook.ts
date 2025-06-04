import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BusinessReportService from './business-report.service';
import {
  BusinessReportResponse,
  TBusinessReport,
} from '@/types/business-report.type';

export const useFetchBusinessReports = ({
  page = 1,
  limit = 10,
  search = '',
  status = '',
  country = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  country?: string;
}) => {
  return useQuery<BusinessReportResponse>({
    queryKey: ['businessReports', { page, limit, search, status, country }],
    queryFn: () =>
      BusinessReportService.fetchBusinessReports({
        pageParam: page,
        search,
        limit,
        status,
        country,
      }),
  });
};

export const useGetBusinessReportById = ({
  businessId,
}: {
  businessId: string;
}) => {
  return useQuery<{ data: TBusinessReport; message: string }>({
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
