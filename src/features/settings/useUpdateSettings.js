import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateSettings,
    isPending: isUpdatingSettings,
    error,
  } = useMutation({
    mutationFn: (obj) => updateSettingsApi(obj),
    onSuccess: () => {
      toast.success("تنظیمات با موفقیت بروزرسانی شد");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err);
    },
  });

  return {
    updateSettings,
    isUpdatingSettings,
    error,
  };
};
