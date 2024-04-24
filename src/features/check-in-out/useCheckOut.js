import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`خروج رزرو به شماره ${data[0].id} با موفقیت ثبت شد.`);
    },
    onError: () => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
    },
  });

  return { checkOut, isCheckingOut, error };
};
