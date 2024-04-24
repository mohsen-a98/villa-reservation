import Today from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useVillas } from "../villas/useVillas";

function DashboardLayout() {
  const { recentBookings, isLoading } = useRecentBookings();

  const {
    recentStays,
    isLoading: isLoadingStays,
    confirmedStay,
    numDays,
  } = useRecentStays();
  const { villas, isLoading: isLoadingVillas } = useVillas();

  if (isLoading || isLoadingStays || isLoadingVillas) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto] lg:grid-rows-[auto_340px_auto]">
      <Stats
        bookings={recentBookings}
        stays={recentStays}
        confirmedStay={confirmedStay}
        numDays={numDays}
        villaCount={villas.length}
      />
      <DurationChart className="lg:col-span-2" confirmedStay={confirmedStay}>
        stay duration summary
      </DurationChart>
      <Today className={"lg:col-span-2"} />
      <SalesChart
        className="sm:col-span-full"
        bookings={recentBookings}
        numDays={numDays}
      >
        chart
      </SalesChart>
    </div>
  );
}

export default DashboardLayout;
