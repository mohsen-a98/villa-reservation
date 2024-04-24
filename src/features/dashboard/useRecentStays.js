import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = +searchParams.get("last") || 7;
  const date = dayjs().subtract(numDays, "day").format();

  const {
    data: recentStays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentStays", `last=${numDays}`],
    queryFn: () => getStaysAfterDate(date),
  });

  const confirmedStay = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return {
    recentStays,
    confirmedStay,
    isLoading,
    error,
    numDays,
  };
};
