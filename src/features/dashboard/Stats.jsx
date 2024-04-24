import { formatCurrency, formatNumber } from "../../utils/helper";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStay, stays, numDays, villaCount }) {
  const bookingsCount = bookings?.length;
  const sales = stays?.reduce((acc, cur) => acc + cur.villaPrice, 0);
  const checkIns = confirmedStay?.length || 0;

  const occupancyRate = Math.round(
    (confirmedStay.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * villaCount)) *
      100,
  );

  return (
    <>
      <Stat
        title={"رزرو ها"}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
        value={bookingsCount}
      />
      <Stat
        title={"تراکنش ها"}
        icon={<HiOutlineBanknotes />}
        color={"green"}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"اقامت ها"}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
        value={formatNumber(checkIns)}
      />
      <Stat
        title={"درصد اقامت"}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
        value={`${formatNumber(occupancyRate)}%`}
      />
    </>
  );
}

export default Stats;
