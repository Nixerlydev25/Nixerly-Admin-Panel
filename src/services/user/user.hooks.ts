import { useMutation, useQuery } from "@tanstack/react-query";
import UserService from "@/services/user/user.service";
import { PaginatedUserResponse } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CustomAxiosError } from "../api";
import { queryClient } from "@/lib/react-query-provider";

export function usePaginatedUser({
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
  const { data, isFetching, error, refetch } = useQuery<PaginatedUserResponse>({
    queryKey: ["users", { page, search, startDate, endDate, limit }],
    queryFn: async () =>
      UserService.fetchUsers({
        pageParam: page,
        search,
        startDate,
        endDate,
        limit,
      }),
    // keepPreviousData: true, // Allows smooth pagination
  });

  return { data, isFetching, error, refetch };
}

export function useBlockUser() {
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: UserService.blockUser,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: response?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReports"],
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
