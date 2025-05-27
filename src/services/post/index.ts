import { useQuery } from "@tanstack/react-query";
import PostService from "./user.service";
import { PaginatedPostResponse } from "@/types/posts";

export function usePaginatedPosts({
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
  const { data, isFetching, error, refetch } = useQuery<PaginatedPostResponse>({
    queryKey: ["posts", { page, search, startDate, endDate, limit }],
    queryFn: async () =>
      PostService.fetchPosts({
        pageParam: page,
        search,
        startDate,
        endDate,
        limit,
      }),
  });

  return { data, isFetching, error, refetch };
}
