import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditVilla } from "../../services/apiVillas";
import toast from "react-hot-toast";

export const useUpdateVilla = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateVilla,
    isPending: isUpdatingVilla,
    error,
  } = useMutation({
    mutationFn: ({ id, newVilla }) => createEditVilla(newVilla, id),
    onSuccess: () => {
      toast.success("ویلا با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err.message);
    },
  });

  return {
    updateVilla,
    isUpdatingVilla,
    error,
  };
};
