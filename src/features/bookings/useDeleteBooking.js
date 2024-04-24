import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteBooking,
    isPending: isDeletingBooking,
    error,
  } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`رزرو با موفقیت حذف شد.`);
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
      console.error(err.message);
      console.log("onError", err);
    },
    onSettled: () => navigate(-1),
  });

  return {
    deleteBooking,
    isDeletingBooking,
    error,
  };
};
