import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "../api";
import { useRouter } from "next/navigation";
import AuthService from "./auth.service";

export function useSignInMutation() {
  const router = useRouter();
  const { toast } = useToast();
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: "Log in Sucess",
        variant: "success",
      });
      router.push("/dashboard");
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
