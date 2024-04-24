import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`ورود رزرو به شماره ${data[0].id} با موفقیت ثبت شد.`);
      console.log(data);
      navigate("/");
    },
    onError: () => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
    },
  });

  return { checkIn, isCheckingIn, error };
};
