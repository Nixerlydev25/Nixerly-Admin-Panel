import { PostReportStatus } from "@/types/types";
import instance from "../api";

export default class PostReportService {
  static async fetchPostReports({
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
      const response = await instance.get(`/admin/post-reports`, {
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
        "Error fetching post reports:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch post reports",
      );
    }
  }
  static async fetchPostById(postId: string) {
    try {
      const response = await instance.get(`/admin/${postId}`);
      return response.data.post;
    } catch (error: any) {
      console.error(
        "Error fetching post:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch post details",
      );
    }
  }
  static async blockPost(postId: string) {
    try {
      const response = await instance.patch(`/admin/post/${postId}/block`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error blocking user:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(error?.response?.data?.message || "Failed to block user");
    }
  }
  
  static async fetchReportedPost(reportId: string) {
    try {
      const response = await instance.get(`/admin/${reportId}/reported-post`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching reported post:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch reported post",
      );
    }
  }
  static async changePostReportStatus(reportId: string, status: PostReportStatus) {
    try {
      const response = await instance.patch(`/admin/${reportId}/change-post-report-status`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error changing post report status:",
        error?.response?.data?.message || error.message,
      );
    }
  }
}
