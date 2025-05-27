export interface DashboardStatsResponse {
  totalUsers: {
    count: number;
    growthPercentage: number;
  };
  totalPosts: {
    count: number;
    growthPercentage: number;
  };
  totalLikes: {
    count: number;
    growthPercentage: number;
  };
  totalComments: {
    count: number;
    growth: number;
  };
}
