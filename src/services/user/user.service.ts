import instance from "../api";

export default class UserService {
  static async fetchUsers({
    pageParam = 1,
    search,
    startDate,
    endDate,
    limit = 1,
  }: {
    pageParam?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    try {
      const response = await instance.get(`/admin/users`, {
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
        "Error fetching users:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(
        error?.response?.data?.message || "Failed to fetch users",
      );
    }
  }

  static async blockUser(userId: string) {
    try {
      const response = await instance.patch(`/admin/${userId}/block`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error blocking user:",
        error?.response?.data?.message || error.message,
      );
      throw new Error(error?.response?.data?.message || "Failed to block user");
    }
  }
}
