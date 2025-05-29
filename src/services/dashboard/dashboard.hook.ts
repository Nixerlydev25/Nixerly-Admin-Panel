import { DashboardStatsResponse } from "@/types/dashboard";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import DashboardService from "./dashboard.service";

export function useDashboardStats(): UseQueryResult<DashboardStatsResponse, Error> {
  return useQuery<DashboardStatsResponse, Error>({
    queryKey: ["dashboard-stats"],
    queryFn: DashboardService.fetchStats,
  });
}
