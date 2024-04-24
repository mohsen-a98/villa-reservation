import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("از حساب کاربری خود با موفقیت خارج شدید");
      queryClient.removeQueries();
      navigate("/login", {
        replace: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return {
    logout,
    isLoggingOut,
    error,
  };
};
