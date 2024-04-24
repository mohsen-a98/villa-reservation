import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("ورود با موفقیت انجام شد");
      navigate("/dashboard", {
        replace: true,
      });
    },
    onError: (err) => {
      toast.error("ایمیل یا رمز عبور اشتباه است");
      console.error(err.message);
    },
  });

  return {
    login,
    isLoggingIn,
    error,
  };
};
