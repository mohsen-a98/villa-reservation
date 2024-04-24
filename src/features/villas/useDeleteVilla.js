import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVilla as deleteVillaApi } from "../../services/apiVillas";
import toast from "react-hot-toast";

export const useDeleteVilla = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteVilla,
    isPending: isDeletingVilla,
    error,
  } = useMutation({
    mutationFn: (id) => deleteVillaApi(id),
    onSuccess: () => {
      toast.success(`ویلا با موفقیت حذف شد.`);
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err.message);
    },
  });

  return {
    deleteVilla,
    isDeletingVilla,
    error,
  };
};
