import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const last = +searchParams.get("last") || 7;
  const date = dayjs().subtract(last, "day").format();

  const {
    data: recentBookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentBookings", `last=${last}`],
    queryFn: () => getBookingsAfterDate(date),
  });

  return {
    recentBookings,
    isLoading,
    error,
  };
};
