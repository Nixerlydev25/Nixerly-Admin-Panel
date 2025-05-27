import instance from "../api";

export default class PostService {
  static async fetchPosts({
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
      const response = await instance.get(`/admin/posts`, {
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
      console.error("Error fetching posts:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || "Failed to fetch posts");
    }
  }
}
