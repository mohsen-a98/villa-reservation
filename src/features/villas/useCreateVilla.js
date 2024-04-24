import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditVilla } from "../../services/apiVillas";
import toast from "react-hot-toast";

export const useCreateVilla = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createVilla,
    isPending: isCreatingVilla,
    error,
  } = useMutation({
    mutationFn: (newVilla) => createEditVilla(newVilla),
    onSuccess: () => {
      toast.success("ویلا با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["villas"] });
    },
    onError: (err) => {
      toast.error("خطایی رخ داده است. لطفا مجددا تلاش کنید");
      console.error(err.message);
    },
  });

  return {
    createVilla,
    isCreatingVilla,
    error,
  };
};
