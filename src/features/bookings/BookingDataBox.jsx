import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
  formatNumber,
} from "../../utils/helper";
import { cn } from "../../utils/cn";

function BookingDataBox({
  booking: {
    numNights,
    villas: { name },
    startDate,
    endDate,
    numGuests,
    isPaid,
    villaPrice,
    created_at,
    guests: { fullName, email, nationalID },
  },
}) {
  const formatDateOptions = { day: "numeric", month: "long", year: "numeric" };

  return (
    <section className="rounded text-lg">
      <header className="flex flex-col items-center justify-between gap-3 rounded-t bg-indigo-500 px-6 py-4 text-white md:flex-row dark:bg-indigo-600 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <HiOutlineHomeModern className="size-8" />
          <p>
            {formatNumber(numNights)} شب اقامت در ویلا {name}
          </p>
        </div>
        <p>
          {formatDate(new Date(startDate), formatDateOptions)} (
          {formatDistanceFromNow(startDate)}) -{" "}
          {formatDate(new Date(endDate), formatDateOptions)}
        </p>
      </header>
      <section className="dark:bg-bg-dark bg-white p-6 dark:text-gray-300">
        <p>
          {fullName} + {numGuests - 1} مهمان {""}
          <span className="text-gray-500 dark:text-gray-400">
            . ({email}) . کد ملی {nationalID}
          </span>
        </p>
        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-2 rounded px-6 py-4 sm:flex-row",
            isPaid
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
          )}
        >
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <HiOutlineCurrencyDollar className="size-6" />
            قیمت کل: <span>{formatCurrency(villaPrice)}</span>
          </div>
          <span className="sm:mr-auto">
            {isPaid ? "پرداخت شده" : "پرداخت در محل"}
          </span>
        </div>
      </section>
      <footer className="dark:bg-bg-dark rounded-b bg-white px-6 py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          رزرو شده در تاریخ{" "}
          {formatDate(new Date(created_at), {
            ...formatDateOptions,
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
