import { useMutation, useQuery } from "@tanstack/react-query";
import UserReportService from "./userReport.service";
import { PaginatedUserReportsResponse } from "@/types/userReports";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { queryClient } from "@/lib/react-query-provider";

export function usePaginatedUserReports({
  page,
  search,
  startDate,
  endDate,
  limit,
}: {
  page: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}) {
  const { data, isFetching, error, refetch } =
    useQuery<PaginatedUserReportsResponse>({
      queryKey: ["userReports", { page, search, startDate, endDate, limit }],
      queryFn: async () =>
        UserReportService.fetchUserReports({
          pageParam: page,
          search,
          startDate,
          endDate,
          limit,
        }),
    });

  return { data, isFetching, error, refetch };
}

export function useResolveUserReport() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (reportId: string) =>
      UserReportService.resolveUserReport(reportId),
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: "sucess",
      });
      queryClient.invalidateQueries({
        queryKey: ["userReports"],
      });
    },
  });

  return { mutation, isFormLoading };
}

export function useDeleteUserReport() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (reportId: string) =>
      UserReportService.deleteUserReport(reportId),
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: "sucess",
      });
      queryClient.invalidateQueries({
        queryKey: ["userReports"],
      });
    },
  });

  return { mutation, isFormLoading };
}
