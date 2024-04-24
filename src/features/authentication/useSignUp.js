import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const {
    mutate: signUp,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err.message);
    },
  });

  return {
    signUp,
    isSigningUp,
    error,
  };
};
