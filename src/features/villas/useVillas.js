import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getVillas } from "../../services/apiVillas";

export const useVillas = () => {
  const [searchParams] = useSearchParams();
  //filter
  const currentFilter = searchParams.get("discount") || "all";
  const filter =
    currentFilter === "all"
      ? null
      : { field: "discount", value: currentFilter };

  //sortBy
  const sortByValue = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const {
    data: villas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["villas", filter, sortBy],
    queryFn: () => getVillas(filter, sortBy),
  });

  return { villas, isLoading, error };
};
