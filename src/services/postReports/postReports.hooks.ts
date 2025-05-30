import { useMutation, useQuery } from "@tanstack/react-query";
import PostReportService from "./postReport.service";
import {
  PaginatedPostReportsResponse,
  ReportResponse,
} from "@/types/postReports";
import { Post } from "@/types/posts";
import { toast, useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { queryClient } from "@/lib/react-query-provider";
import { CustomAxiosError } from "../api";
import { PostReportStatus } from "@/types/types";

export function usePaginatedPostReports({
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
    useQuery<PaginatedPostReportsResponse>({
      queryKey: ["postReports", { page, search, startDate, endDate, limit }],
      queryFn: async () =>
        PostReportService.fetchPostReports({
          pageParam: page,
          search,
          startDate,
          endDate,
          limit,
        }),
    });

  return { data, isFetching, error, refetch };
}

export function useSinglePost(postId: string) {
  const { data, isFetching, error, refetch } = useQuery<Post>({
    queryKey: ["single-post", postId],
    queryFn: async () => PostReportService.fetchPostById(postId),
    enabled: !!postId,
  });

  return { data, isFetching, error, refetch };
}

export function useBlockPost() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: PostReportService.blockPost,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reported-post"],
      });
    },
    onError: (error: CustomAxiosError) => {
      setFormLoading(false);
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });
  return {
    mutation,
    formStatus: {
      isFormLoading,
      setFormLoading,
    },
  };
}

export function useReportedPost(reportId: string) {
  const { data, isFetching, error, refetch } = useQuery<ReportResponse>({
    queryKey: ["reported-post", reportId],
    queryFn: async () => PostReportService.fetchReportedPost(reportId),
  });

  return { data, isFetching, error, refetch };
}

export function useChangePostReportStatus() {
  const mutation = useMutation({
    mutationKey: ["change-post-report-status"],
    mutationFn: ({
      reportId,
      status,
    }: {
      reportId: string;
      status: PostReportStatus;
    }) => PostReportService.changePostReportStatus(reportId, status),
    onSuccess: (response) => {
      toast({
        title: response?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["reported-post"],
      });
    },
    onError: (error: CustomAxiosError) => {
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });
  return mutation;
}
