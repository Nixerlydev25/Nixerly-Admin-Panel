import { useMutation } from "@tanstack/react-query";
import RestrictionService from "./restriction.service";
import { queryClient } from "@/lib/react-query-provider";

export function useRestrictionMutations() {
  // Add Restriction Mutation
  const addRestriction = useMutation({
    mutationFn: ({
      userId,
      restrictionType,
    }: {
      userId: string;
      restrictionType: string;
    }) => RestrictionService.addRestriction(userId, restrictionType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      console.error("Failed to add restriction:", error);
    },
  });

  // Remove Restriction Mutation
  const removeRestriction = useMutation({
    mutationFn: ({
      userId,
      restrictionType,
    }: {
      userId: string;
      restrictionType: string;
    }) => RestrictionService.removeRestriction(userId, restrictionType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      console.error("Failed to remove restriction:", error);
    },
  });

  return { addRestriction, removeRestriction };
}
