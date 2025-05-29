import { DashboardStatsResponse } from "@/types/dashboard";
import instance from "../api";

export default class DashboardService {
  static async fetchStats(): Promise<DashboardStatsResponse> {
    try {
      const response = await instance.get<DashboardStatsResponse>(
        "/admin/statistics/dashboard-statistics",
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching dashboard stats:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch dashboard stats",
      );
    }
  }
}
