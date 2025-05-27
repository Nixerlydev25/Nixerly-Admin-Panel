import instance from "../api";

export default class UserReportService {
  static async fetchUserReports({
    pageParam = 1,
    search,
    startDate,
    endDate,
    limit = 10,
  }: {
    pageParam?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    try {
      const response = await instance.get(`/admin/user-reports`, {
        params: {
          page: pageParam,
          limit,
          search,
          startDate,
          endDate,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching user reports:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch user reports",
      );
    }
  }
  static async resolveUserReport(reportId: string) {
    try {
      const response = await instance.patch(
        `/admin/${reportId}/resolve-user-report`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error resolving user report:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to resolve user report",
      );
    }
  }
  static async deleteUserReport(reportId: string) {
    try {
      const response = await instance.delete(`/admin/${reportId}/delete-user-report`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error deleting user report:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(error?.response?.data?.message || "Failed to delete user report");
    }
  }
}
