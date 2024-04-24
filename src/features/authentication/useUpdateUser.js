import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("به روز رسانی با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err.message);
    },
  });

  return {
    updateUser,
    isPending,
    error,
  };
};
